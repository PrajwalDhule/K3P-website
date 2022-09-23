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
          {/* <Image className="img" src={logo} height="50px" width="50px" /> */}
          {/* <img src={logo} /> */}
          <img src="/logo.png"></img>
          <p>Helpalert</p>
        </div>
          </Link>
        <div className="nav-items">
          <li
            className={`hide ${show}-1`}
            
          >
            <img src="/home.svg"></img>
            <Link href="/dashboard" onClick={() => {
              setShow("show-1");
            }}>
              <p>Dashboard</p>
            </Link>
          </li>
          <li
            className={`hide ${show}-2`}
            
          >
            <img src="/alert.svg"></img>
            <Link href="/alert" onClick={() => {
              setShow("show-2");
            }}>
              <p>Alerts</p>
            </Link>
          </li>
          <li
            className={`hide ${show}-3`}

          >
            <img src="/home.svg"></img>
            <Link href="/dashboard" onClick={() => {
              setShow("show-3");
            }}>
              <p>Approve</p>
            </Link>
          </li>
          <li
            className={`hide ${show}-4`}

          >
            <img src="/tick.svg"></img>
            <Link href="/safezone" onClick={() => {
              setShow("show-4");
            }}>
              <p>Safe zones</p>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
