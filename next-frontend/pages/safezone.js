import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

// import BarChart from "./BarChart";
// import Profile from "./Profile";
import Records from "./data.json";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";
import Geocode, { setApiKey } from "react-geocode";
import { db } from "./firebase";
import {
  getFirestore,
  addDoc,
  collection,
  arrayUnion,
  GeoPoint,
  query,
  where,
  getDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const Safezone = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [category, setCategory] = useState("");
  const placeholder = "Enter a Name";
  const [address, setAddress] = useState("Address not selected");
  const [city, setCity] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [zone, setZone] = React.useState("");
  const [eventID, setEventID] = React.useState("#E123245");
  const data = Records;
  Geocode.setApiKey("AIzaSyClwDKfzGV_7ICoib-lk2rH0iw5IlKW5Lw");
  Geocode.enableDebug();
  // Map params
  const containerStyle = {
    height: "60vh",
    width: "calc(100%-48px)",
    marginTop: "20px",
    margin: "24px",
    // marginLeft: "200px",
  };

  const [center, setCenter] = React.useState({
    lat: 19.076,
    lng: 72.8777,
  });
  const [position, setPosition] = React.useState({
    lat: 37.772,
    lng: -122.214,
  });

  const uploadSafeZone = async () => {
    console.log(eventID);
    console.log(address);
    console.log(city);
    console.log(zone);
    console.log(center.lat);
    console.log(center.lng);

    try {
      const docRef = await addDoc(collection(db, "safezone"), {
        disasterID: eventID,
        locationAddress: address,
        contactNo: contact,
        locationZone: zone,
        locationLat: center.lat,
        locationLong: center.lng,
        locationCity: city,
      });
      console.log("Document updated with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.Name?.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="safezone-body">
      <Navbar index="4" />
      <div className="top">
        <div className="search">
          <div className="searchInputs">
            <input
              type="text"
              placeholder={placeholder}
              value={wordEntered}
              onChange={handleFilter}
            />
            <div className="searchIcon">
              {filteredData.length === 0 ? (
                // <SearchIcon />
                <p>search</p>
              ) : (
                // <CloseIcon id="clearBtn" onClick={clearInput} />
                <p id="clearBtn" onClick={clearInput}>
                  clear
                </p>
              )}
            </div>
          </div>
          {filteredData.length != 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((value) => {
                return (
                  <p
                    className="dataItem"
                    value={value.Name}
                    onClick={() => handleClick(value.Name)}
                    target="_blank"
                  >
                    <p>{value.Name} </p>
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="safe-zone-main-container" style={{ marginLeft: "20vw" }}>
        <LoadScript
          googleMapsApiKey="AIzaSyClwDKfzGV_7ICoib-lk2rH0iw5IlKW5Lw"
          libraries={["places"]}
        >
          <GoogleMap
            id="marker-example"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            onClick={(e) => {
              setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              Geocode.fromLatLng(
                center.lat.toString(),
                center.lng.toString()
              ).then(
                (response) => {
                  var locality = "";
                  for (
                    let i = 0;
                    i < response.results[0].address_components.length;
                    i++
                  ) {
                    for (
                      let j = 0;
                      j <
                      response.results[0].address_components[i].types.length;
                      j++
                    ) {
                      switch (
                        response.results[0].address_components[i].types[j]
                      ) {
                        case "locality":
                          setCity(
                            response.results[0].address_components[i].long_name
                          );
                          break;
                        case "sublocality":
                          locality +=
                            response.results[0].address_components[i]
                              .long_name + " ";
                          break;
                      }
                    }
                  }
                  setZone(locality);
                  console.log(response.results[0].formatted_address);
                  // console.log(vendingZoneLocality);
                  setAddress(response.results[0].formatted_address);
                },
                (error) => {
                  console.log(error);
                }
              );
            }}
          >
            <Autocomplete>
              <input
                type="text"
                placeholder="Enter zone address"
                onChange={(e) => {
                  Geocode.fromAddress(e.target.value).then(
                    (response) => {
                      const { lat, lng } =
                        response.results[0].geometry.location;
                      setPosition({ lat: lat, lng: lng });
                      setCenter({ lat: lat, lng: lng });
                      console.log(response.results[0]);
                      var tmplocality = "";
                      for (
                        let i = 0;
                        i < response.results[0].address_components.length;
                        i++
                      ) {
                        for (
                          let j = 0;
                          j <
                          response.results[0].address_components[i].types
                            .length;
                          j++
                        ) {
                          switch (
                            response.results[0].address_components[i].types[j]
                          ) {
                            case "locality":
                              setCity(
                                response.results[0].address_components[i]
                                  .long_name
                              );
                              break;
                            case "sublocality":
                              tmplocality +=
                                response.results[0].address_components[i]
                                  .long_name + " ";
                              break;
                          }
                        }
                      }
                      setAddress(response.results[0].formatted_address);
                      setZone(tmplocality);
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
                }}
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid var(--primary-color-dark)`,
                  width: `320px`,
                  height: `48px`,
                  padding: `1rem 2rem`,
                  borderRadius: `0.9rem`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `1rem`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-120px",
                }}
              />
            </Autocomplete>
            <MarkerF
              // onLoad={onLoad}
              position={center}
            />
            {/* Child components, such as markers, info windows, etc. */}
            {/* <></> */}
            <MarkerF />
          </GoogleMap>
        </LoadScript>
        <div className="footer">
          {/* <div className="searchIcon">
                {filteredData.length === 0 ? (
                  // <SearchIcon />
                  <p>search</p>
                ) : (
                  // <CloseIcon id="clearBtn" onClick={clearInput} />
                  <p id="clearBtn" onClick={clearInput}>
                    clear
                  </p>
                )}
              </div> */}
          <div className="address">
            <p>Address:</p>
            <p>{address}</p>
          </div>
          <div className="right">
            <input
              type="text"
              placeholder={"Enter contact number"}
              value={contact}
              onChange={(e) => {
                setContact(e.target.value);
              }}
              id="contact"
            />
            <button
              onClick={(e) => {
                uploadSafeZone();
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Safezone;
