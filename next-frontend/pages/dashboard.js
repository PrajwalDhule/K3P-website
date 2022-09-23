import React from "react";
import Navbar from "../components/navbar";

const dashboard = () => {
  return (
    <div className="dashboard-body">
      <Navbar index="1" />
      <div className="container">
        <div className="filters">
          <div className="filter">
            <p className="title">Date Range</p>
            <div>
              img
              <p>This month</p>
            </div>
          </div>
          <div className="filter">
            <p className="title">Event Category</p>
            <div>
              <p>All</p>
              img
            </div>
          </div>
          <div className="filter">
            <p className="title">Event Location</p>
            <div>
              <p>All</p>
              img
            </div>
          </div>
        </div>
        <div className="content">
          <div className="box">
            <p className="title">Solved Reports</p>
            <div>
              <p>12869</p>
              <p>15%</p>
            </div>
          </div>
          <div className="box">
            <p className="title">Unsolved Reports</p>
            <div>
              <p>28869</p>
              <p>25%</p>
            </div>
          </div>
          <div className="box">
            <p className="title">Other Stats</p>
            <div>
              <p>25</p>
              <p>10%</p>
            </div>
          </div>
          <div className="box">
            <p className="title">Total donations</p>
            <div>
              <p>73947 Rs</p>
              <p>35%</p>
            </div>
          </div>
          <div className="box">{/* <img src="/graph_1.jpeg"></img> */}</div>
          <div className="box">{/* <img src="/graph_2.jpeg"></img> */}</div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
