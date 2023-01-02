import React from "react";
import Navbar from "../components/navbar";
import { Line } from "react-chartjs-2";
import Records from "../other/data.json";

const Dashboard = () => {
  //function to get values from certain person's data
  function getData(person) {
    const newFilter = Records.filter((value) => {
      return value.Name?.toLowerCase().includes(person.toLowerCase());
    });
    const object = newFilter[0];
    const datasetArray = [];
    for (const key in object) {
      datasetArray.push(object[key]);
    }
    datasetArray.shift();
    return datasetArray;
  }
  //array of keys
  const object = Records[0];
  const keyArray = [];
  let meanArray = [];
  for (const key in object) {
    keyArray.push(key);
    meanArray.push(0);
  }
  meanArray.shift();
  keyArray.shift();

  //arrays of required values
  const datasetArray = getData("mukesh");
  const idealArray = getData("Ideal");
  Records.forEach((item) => {
    if (item.Name != "Ideal") {
      let i = 0;
      for (const key in item) {
        if (key != "Name") {
          meanArray[i] += item[key];
          i++;
        }
      }
    }
  });
  meanArray.forEach((item, index, arr) => {
    meanArray[index] = item / Records.length;
  });

  //colors of lines
  const borderArray1 = [];
  const borderArray2 = [];
  const borderArray3 = [];
  for (let i = 0; i < Object.keys(object).length - 1; i++) {
    borderArray1.push("rgba(0, 0, 0, 1)");
    borderArray2.push("rgba(35, 11, 156, 0.8)");
    borderArray3.push("rgba(9, 128, 88, 0.8)");
  }

  //   console.log(
  //     keyArray,
  //     datasetArray,
  //     idealArray,
  //     meanArray,
  //     borderArray1,
  //     borderArray2,
  //     borderArray3
  //   );

  const one = 15,
    two = 25,
    three = -10,
    four = 35;

  return (
    <div className="dashboard-body">
      <Navbar index="1" />
      <div className="container">
        <div className="filters">
          <div className="filter">
            <p className="title">Date Range</p>
            <div>
              <img src="/calender.svg"></img>
              <p>This month</p>
            </div>
          </div>
          <div className="filter">
            <p className="title">Event Category</p>
            <div>
              <p>All</p>
              <img src="/more.svg"></img>
            </div>
          </div>
          <div className="filter">
            <p className="title">Event Location</p>
            <div>
              <p>All</p>
              <img src="/more.svg"></img>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="box">
            <p className="title">Solved Reports</p>
            <div>
              <p>12869</p>
              <div>
                <img src={one < 0 ? "/down.svg" : "/up.svg"}></img>
                <p className={one < 0 ? "red" : "green"}>{one}%</p>
              </div>
            </div>
          </div>
          <div className="box">
            <p className="title">Unsolved Reports</p>
            <div>
              <p>28869</p>
              <div>
                <img src={two < 0 ? "/down.svg" : "/up.svg"}></img>
                <p className={two < 0 ? "red" : "green"}>{two}%</p>
              </div>
            </div>
          </div>
          <div className="box">
            <p className="title">Other Stats</p>
            <div>
              <p>25</p>
              <div>
                <img src={three < 0 ? "/down.svg" : "/up.svg"}></img>
                <p className={three < 0 ? "red" : "green"}>{three}%</p>
              </div>
            </div>
          </div>
          <div className="box">
            <p className="title">Total donations</p>
            <div>
              <p>73947 Rs</p>
              <div>
                <img src={four < 0 ? "/down.svg" : "/up.svg"}></img>
                <p className={four < 0 ? "red" : "green"}>{four}%</p>
              </div>
            </div>
          </div>
          <div className="box">{/* <img src="/graph_1.jpeg"></img> */}</div>
          <div className="box">{/* <img src="/graph_2.jpeg"></img> */}</div>
        </div>
      </div>
      <div>
        {() => {
          return (
            <Line
              data={{
                labels: keyArray,
                datasets: [
                  {
                    label: "mukesh" || "Ideal",
                    data: datasetArray,
                    borderColor: borderArray2,
                    borderWidth: 1.5,
                    fill: false,
                  },
                  {
                    label: "Ideal",
                    data: idealArray,
                    borderColor: borderArray1,
                    borderWidth: 1.5,
                    fill: false,
                  },
                  {
                    label: "Mean",
                    data: meanArray,
                    borderColor: borderArray3,
                    borderWidth: 1.5,
                    fill: false,
                  },
                ],
              }}
              height={400}
              width={600}
              options={{ maintainAspectRatio: false }}
            />
          );
        }}
      </div>
    </div>
  );
};

export default Dashboard;
