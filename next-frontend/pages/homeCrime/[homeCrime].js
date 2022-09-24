import React, { useState } from "react";
import { db } from "./../firebase";
import Navbar from "../../components/navbar.js";
import Link from 'next/link'
import {
  getFirestore,
  addDoc,
  collection,
  query,
  getDoc,
  where,
  doc,
} from "firebase/firestore";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  Autocomplete,
} from "@react-google-maps/api";

export default function HomeCrimeDetails({ ID, data }) {
  // Map params
  console.log(data);
  const containerStyle = {
    height: "60vh",
    width: "calc(100%-48px)",
    marginTop: "20px",
    margin: "24px",
    // marginLeft: "200px",
  };

  const [center, setCenter] = React.useState({
    lat: data.locationLat,
    lng: data.locationLong,
  });
  console.log(center);
  const [position, setPosition] = React.useState({
    lat: 37.772,
    lng: -122.214,
  });
  
  let spamReq = async () =>{
    const q = query(collection(db, "users"),where("phoneNo","==","+919969534217"));
    const querySnapshot = await getDocs(q);
    var creditScore = querySnapshot.docs[0].get("creditScore")-2;
    const docref = doc(db,"users",querySnapshot.docs[0].id);
    updateDoc(docref,{creditScore:creditScore});
    // const docref = doc(db,"users",querySnapshot.docs[0].id);
    // deleteDoc(docref);
    const docref2 = doc(db,"homecrime",ID);
    deleteDoc(docref2);
  }

  let ApproveReq = async () =>{
    const q = query(collection(db, "users"),where("phoneNo","==","+919969534217"));
    const querySnapshot = await getDocs(q);
    var creditScore = querySnapshot.docs[0].get("creditScore")+10;
    const docref = doc(db,"users",querySnapshot.docs[0].id);
    updateDoc(docref,{creditScore:creditScore,approve:true});
  }
  let ProcessReq = async () =>{
    const docref2 = doc(db,"homecrime",ID);
    deleteDoc(docref2);
  }
  console.log(data);
  return (
    <div className="disaster-main-container disaster-body">
       {/* <Navbar index="2" /> */}
      <div className="top">
        <p>{data.disasterType}Robbery</p>
        <p>
          {data.description} orem, ipsum dolor sit amet consectetur adipisicing
          elit. Rerum nostrum nemo veritatis consectetur temporibus, natus
          officiis eveniet aliquid tempora inventore
        </p>
      </div>
      <LoadScript
        googleMapsApiKey="AIzaSyClwDKfzGV_7ICoib-lk2rH0iw5IlKW5Lw"
        libraries={["places"]}
      >
        <GoogleMap
          id="marker-example"
          mapContainerStyle={containerStyle}
          center={center}
          zoom={16}
        >
          <MarkerF
            // onLoad={onLoad}
            position={center}
          />
        </GoogleMap>
      </LoadScript>
      <div className="buttons">
          <Link href="/alert">
            <button>
              <img src="/more.svg" /> Go back
            </button>
          </Link>
          <button onClick={()=>{spamReq()}}>
            <img src="/spam.svg" />
            Spam
          </button>
          <button onClick={()=>{ApproveReq()}}>
            <img src="/tick.svg" />
            Approve
          </button>
          <button onClick={()=>{ProcessReq()}}>
            <img src="/tick.svg" />
            Disaster Reported
          </button>
        </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { homeCrime } = params;
  const docref = doc(db, "homecrime/" + homeCrime);
  const docsnap = await getDoc(docref);
  console.log(docsnap.data());
  return {
    props: {
      ID: homeCrime,
      data: docsnap.data(),
    },
  };
}
