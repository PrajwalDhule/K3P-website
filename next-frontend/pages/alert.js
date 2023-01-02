import React, { useState } from "react";
import Navbar from "../components/navbar";
import Switch from "./../components/switch";
import { db } from "./firebase";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";
import Link from "next/link";
/**
 *
 * @Params for home crime
 * crimeType
 * current
 * imageUrl
 * description
 * locationLat
 * locationLong
 *
 * @Params for disaster
 * disasterType
 * locationLat
 * locationLong
 * current
 * description
 */
const Alert = ({ disasterListfromServer, homeCrimeListfromServer }) => {
  const [cityEntered, setCityEntered] = useState("");
  const [disasterType, setDisasterType] = useState(true);
  const [disasterList, setDisasterList] = useState(disasterListfromServer);
  const [homeCrimeList, setHomeCrimeList] = useState(homeCrimeListfromServer);

  let getLatestDataDisaster = async () => {
    const q = query(collection(db, "disaster"));
    // if(cityEntered != "") q = query(collection(db,"disaster"),where("city","==",cityEntered));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs.length);
    var tmpDisaster = [];
    querySnapshot.forEach((doc) => {
      tmpDisaster.push(doc.data());
    });
    console.log(tmpDisaster);
    setDisasterList(tmpDisaster);
  };
  let getLatestDataHomeCrime = async () => {
    const q = query(collection(db, "homecrime"));
    // if(cityEntered != "") q = query(collection(db,"disaster"),where("city","==",cityEntered));

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs.length);
    var tmpHomeCrime = [];
    querySnapshot.forEach((doc) => {
      tmpHomeCrime.push(doc.data());
    });
    console.log(tmpHomeCrime);
    setHomeCrimeList(tmpHomeCrime);
  };
  function DisasterList() {
    return (
      <div>
        {disasterList.map((item) => {
          return (
            <div className="card" key={item.ID}>
              <div className="card-title">
                {" "}
                <Link href={"/disaster/" + item.ID}>
                  {item.data.disasterType}
                </Link>
              </div>
              <div className="card-description">{item.data.description}</div>
            </div>
          );
        })}
      </div>
    );
  }
  function HomeCrimeList() {
    return (
      <div>
        {homeCrimeList.map((item) => {
          return (
            <div className="card">
              <div className="card-title"> {" "}
                <Link href={"/homeCrime/" + item.ID}>
                  {item.data.disasterType}
                </Link></div>
              <div className="card-description">{item.data.description}</div>
            </div>
          );
        })}
      </div>
    );
  }
  function List() {
    if (disasterType)
      return (
        <div className="alert-list-container">
          <HomeCrimeList />
        </div>
      );
    else
      return (
        <div className="alert-list-container">
          <DisasterList />
        </div>
      );
  }

  let submitQuery = (e) => {
    if (disasterType) getLatestDataDisaster();
    else getLatestDataHomeCrime();
  };
  // getLatestDataDisaster();
  return (
    <div style={{ width: "100vw", height: "100vh" }} className="alert-body">
      <Navbar index="2" />
      <div className="top">
        <div className="search">
          <div className="top-item">
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
            <div className="button" onClick={(e) => submitQuery(e)}>
              Submit
            </div>
          </div>
          <div className="top-item">
            <div className="disaster">Disaster</div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Switch
                isOn={disasterType}
                handleToggle={() => setDisasterType(!disasterType)}
              />
            </div>
            <div className="homeCrime">Home Crime</div>
          </div>
        </div>
      </div>
      <List />
    </div>
  );
};

export default Alert;

export async function getServerSideProps(context) {
  // const res = await axios.get(
  //   "http://localhost:4000/api/getvendingzones/search"
  // );
  // // console.log(res);
  // const data = await JSON.parse(JSON.stringify(res.data));
  const q = query(collection(db, "disaster"));

  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs.length);
  var tmpDisaster = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    tmpDisaster.push({ ID: doc.id, data: doc.data() });
  });
  console.log(tmpDisaster);
  const q2 = query(collection(db, "homecrime"));

  const querySnapshot2 = await getDocs(q2);
  console.log(querySnapshot2.docs.length);
  var tmpHomeCrime = [];
  querySnapshot2.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    tmpHomeCrime.push({ ID: doc.id, data: doc.data() });
  });
  console.log(tmpHomeCrime);
  // setDisasterList(tmpDisaster);
  return {
    props: {
      disasterListfromServer: tmpDisaster,
      homeCrimeListfromServer: tmpHomeCrime,
    },
  };
}
