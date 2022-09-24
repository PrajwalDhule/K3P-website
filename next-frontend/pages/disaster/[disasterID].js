import React, { useState } from "react";
import Navbar from "../../components/navbar.js";
import { db } from "./../firebase";
import Link from "next/link";
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

export default function DisasterDetails({ ID, data }) {
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

  console.log(data);
  return (
    <>
      <Navbar index="2" />
      <div
        className="disaster-main-container disaster-body"
        style={{ width: "100vw", height: "100vh" }}
      >
        <div className="top">
          <p>{data.disasterType}Robbery</p>
          <p>
            {data.description} orem, ipsum dolor sit amet consectetur
            adipisicing elit. Rerum nostrum nemo veritatis consectetur
            temporibus, natus officiis eveniet aliquid tempora inventore
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
          <button>
            <img src="/spam.svg" />
            Spam
          </button>
          <button>
            <img src="/tick.svg" />
            Approve
          </button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { disasterID } = params;
  const docref = doc(db, "disaster/" + disasterID);
  const docsnap = await getDoc(docref);
  // console.log(docsnap.data());
  return {
    props: {
      ID: disasterID,
      data: docsnap.data(),
    },
  };
}
