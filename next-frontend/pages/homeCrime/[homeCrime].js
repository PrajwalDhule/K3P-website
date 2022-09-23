import React, { useState } from "react";
import { db } from "./../firebase";
import { getFirestore, addDoc, collection, query, getDoc, where, doc } from "firebase/firestore";


export default function HomeCrimeDetails ({ID,data}) {
    console.log(data);
    return (
        <div className="disaster-main-container">
            <div>{ID}</div>
            
        </div>
    )
} 

export async function getServerSideProps(context) {
    const { params } = context;
    const { homeCrimeID } = params;
    const docref = doc(db,"homeCrime/"+disasterID);
    const docsnap = await getDoc(docref);
    console.log(docsnap.data());
    return {
      props: {
        ID: disasterID,
        data: docsnap.data()
      },
    };
  }