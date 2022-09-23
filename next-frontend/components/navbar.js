import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = (props) => {
  const [show, setShow] = useState(`show-${props.index}`);

  return (
    <div className="nav-body">
      <div className="nav-container">
        <Link href="/">
          <div className="name">
            <img src="/logo.png"></img>
            <p>Helpalert</p>
          </div>
        </Link>
        <div className="nav-items">
          <Link
            href="/dashboard"
            onClick={() => {
              setShow("show-1");
            }}
          >
            <li className={`hide ${show}-1`}>
              <img src="/home.svg"></img>
              <p>Dashboard</p>
            </li>
          </Link>
          <Link
            href="/alert"
            onClick={() => {
              setShow("show-2");
            }}
          >
            <li className={`hide ${show}-2`}>
              <img src="/alert.svg"></img>
              <p>Alerts</p>
            </li>
          </Link>

          <Link
            href="/safezone"
            onClick={() => {
              setShow("show-3");
            }}
          >
            <li className={`hide ${show}-3`}>
              <img src="/tick.svg"></img>
              <p>Safe zones</p>
            </li>
          </Link>
          <Link
            href="/profile"
            onClick={() => {
              setShow("show-4");
            }}
          >
            <li className={`hide ${show}-4`}>
              <img src="/profile.svg"></img>
              <p>Profile</p>
            </li>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
