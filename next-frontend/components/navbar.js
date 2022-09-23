import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.png";

const Navbar = () => {
  const [show, setShow] = useState("show-1");

  return (
    <div className="nav-body">
      <div className="nav-container">
        <div className="name">
          {/* <Image className="img" src={logo} height="50px" width="50px" /> */}
          {/* <img src={logo} /> */}
          <span>Q</span>
          <p>Helpalert</p>
        </div>
        <div className="nav-items">
          <li
            className={`hide ${show}-1`}
            onClick={() => {
              setShow("show-1");
            }}
          >
            <span>Q</span>
            <Link href="/dashboard">
              <p>Dashboard</p>
            </Link>
          </li>
          <li
            className={`hide ${show}-2`}
            onClick={() => {
              setShow("show-2");
            }}
          >
            <span>Q</span>
            <Link href="/dashboard">
              <p>Alerts</p>
            </Link>
          </li>
          <li
            className={`hide ${show}-3`}
            onClick={() => {
              setShow("show-3");
            }}
          >
            <span>Q</span>
            <Link href="/dashboard">
              <p>Approve</p>
            </Link>
          </li>
          <li
            className={`hide ${show}-4`}
            onClick={() => {
              setShow("show-4");
            }}
          >
            <span>Q</span>
            <Link href="/dashboard">
              <p>Safe zones</p>
            </Link>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
