import React, { useState } from "react";
import Navbar from "../components/navbar";
import Switch from "./../components/switch";
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

const alert = () => {
  const [cityEntered, setCityEntered] = useState("");
  const [disasterType, setDisasterType] = useState(true);
  const [disasterList, setDisasterList] = useState([1, 2, 3, 4, 5]);
  const [homeCrimeList, setHomeCrimeList] = useState([10, 20, 30, 40, 50]);
  function DisasterList() {
    return (
      <div>
        {disasterList.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
    );
  }
  function HomeCrimeList() {
    return (
      <div>
        {homeCrimeList.map((item) => {
          return <div>{item}</div>;
        })}
      </div>
    );
  }
  function List() {
    if (disasterType)
      return (
        <div className="alert-list-container">
          <DisasterList />
        </div>
      );
    else
      return (
        <div className="alert-list-container">
          <HomeCrimeList />
        </div>
      );
  }
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="alert-body">
      <Navbar index="2" />
      <div className="top">
        <div className="search">
          <div className="searchInputs">
            <input
              type="text"
              placeholder={"Enter city"}
              value={cityEntered}
              onChange={(e) => {
                setCityEntered(e.target.value);
              }}
            />
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
          </div>
          <div>Submit</div>
          <div>Disaster</div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Switch
              isOn={disasterType}
              handleToggle={() => setDisasterType(!disasterType)}
            />
          </div>
          <div>Home Crime</div>
        </div>
      </div>
      <List />
    </div>
  );
};

export default alert;
