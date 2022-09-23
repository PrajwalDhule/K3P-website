import React, { useState } from "react";
import { db } from "./../firebase";
import { getFirestore, addDoc, collection, query, getDoc, where, doc } from "firebase/firestore";
import {
    GoogleMap,
    LoadScript,
    MarkerF,
    Autocomplete,
  } from "@react-google-maps/api";


export default function DisasterDetails ({ID,data}) {
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
        <div className="disaster-main-container" style={{width:"100vw",height:"100vh"}}>
            <div>{ID}</div>
            <LoadScript
          googleMapsApiKey="AIzaSyClwDKfzGV_7ICoib-lk2rH0iw5IlKW5Lw"
          libraries={["places"]}
        >
          <GoogleMap
            id="marker-example"
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}>
            <MarkerF
              // onLoad={onLoad}
              position={center}
            />
            
          </GoogleMap>
        </LoadScript>
        {data.description} <br/>
        {data.disasterType} <br/>
        <div>Spam</div>
        <div>Approve</div>
        </div>
    )
} 

export async function getServerSideProps(context) {
    const { params } = context;
    const { disasterID } = params;
    const docref = doc(db,"disaster/"+disasterID);
    const docsnap = await getDoc(docref);
    // console.log(docsnap.data());
    return {
      props: {
        ID: disasterID,
        data: docsnap.data()
      },
    };
  }