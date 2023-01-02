import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";

const Profile = () => {
  return (
    <div className="profile-body">
      <Navbar index="4" />
      <div className="profile-container">
        <div className="main">
          <div className="pfp">
            <img src="/police.png" />
          </div>
          <div className="name">
            <p>Kherwadi Police Station</p>
            <p>poolis123@gmail.com</p>
          </div>
        </div>
        <div className="content">
          <div className="left">
            <div className="field">
              <p>Website:</p>
              <p>https://themeisle.com/illustrations/</p>
            </div>
            <div className="field">
              <p>Location:</p>
              <p>Kherwadi, Bandra(E), Mumbai</p>
            </div>
            <div className="field">
              <p>No. of reports handled:</p>
              <p>24</p>
            </div>
          </div>
          <div className="right">
            <div className="field">
              <p>Contact number:</p>
              <p>9870654321</p>
            </div>
            <div className="field">
              <p>Organization description:</p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum
                nostrum nemo veritatis consectetur temporibus, natus officiis
                eveniet aliquid tempora inventore deleniti velit ex corporis
                distinctio praesentium fuga laborum reprehenderit magnam minus
                omnis suscipit totam, ab nobis dolorum. Officiis doloribus
                dolorem facilis odit exercitationem sunt reprehenderit magni
                rerum corrupti, incidunt atque ex, possimus est neque vitae
                dolore libero, illo perspiciatis quidem.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
