import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

// import BarChart from "./BarChart";
// import Profile from "./Profile";
import Records from "./data.json";
import { db } from "../components/firebase";
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
  doc,
  getDocs,
} from "firebase/firestore";

const Safezone = (disasterListfromServer) => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [organization, setOrgName] = useState("");
  const placeholder = "Enter disaster description";
  const [address, setAddress] = useState("Address not selected");
  const [payment, setPayment] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [zone, setZone] = React.useState("");
  const [eventID, setEventID] = React.useState("#E123245");
  // const data = Records;

  // console.log(disasterListfromServer.disasterListfromServer.data);
  // disasterListfromServer.disasterListfromServer.data.map((i)=>{
  //   console.log(i);

  const uploadDonation = async () => {
    try {
        const docref2 = doc(db, "disaster", eventID);
        const data2 = await getDoc(docref2);
        
      const docRef = await addDoc(collection(db, "donation"), {
        disasterID: eventID,
        organization: organization,
        donationLink: payment,
        contact: contact,
        disasterDesc: data2.get("description"),
        disasterType: data2.get("disasterType")
      });
      console.log("Document updated with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleFilter = (event) => {
    console.log(disasterListfromServer.disasterListfromServer);
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = disasterListfromServer.disasterListfromServer.data.filter(
      (value) => {
        return value.disasterDesc.description
          .toLowerCase()
          .includes(searchWord.toLowerCase());
      }
    );
    console.log(newFilter);
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
    <div className="donation-body">
      <Navbar index="5" />
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
                var desc = value.disasterDesc.description.toString();
                console.log(value.disasterDesc.description);
                console.log("dcsksdcaad");
                return (
                  <div
                    key={value.disasterID}
                    className="dataItem"
                    target="_blank"
                    onClick={(e) => {
                      setEventID(value.disasterID);
                      setFilteredData([]);
                      setWordEntered(value.disasterDesc.description);
                    }}
                  >
                    <p>{value.disasterDesc.description} </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="safe-zone-main-container" style={{ marginLeft: "20vw" }}>
        <div className="footer">
          <div className="right">
            <input
              type="text"
              placeholder={"Enter Organization name (NGO)"}
              value={organization}
              onChange={(e) => {
                setOrgName(e.target.value);
              }}
              id="contact"
            />
          </div>

          <div className="right">
            <input
              type="text"
              placeholder={"Enter payment link"}
              value={payment}
              onChange={(e) => {
                setPayment(e.target.value);
              }}
              id="contact"
            />
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
                uploadDonation();
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

export async function getServerSideProps(context) {
  const q = query(collection(db, "disaster"));

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs.length);
  var tmpDisaster = [];
//   console.log(typeof tmpDisaster + " askjxnjkas");
  querySnapshot.docs.forEach((doc) => {
    var data = {
      disasterID: doc.id,
      disasterDesc: doc.data("description"),
    };
    tmpDisaster.push(data);
  });

  console.log(tmpDisaster);
  console.log(typeof tmpDisaster);
  return {
    props: {
      disasterListfromServer: { data: tmpDisaster },
    },
  };
}
