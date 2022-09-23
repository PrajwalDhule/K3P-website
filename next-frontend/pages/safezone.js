import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
// import BarChart from "./BarChart";
// import Profile from "./Profile";
import Records from "./data.json";

const Safezone = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [person, setPerson] = useState("");
  const [category, setCategory] = useState("");
  const placeholder = "Enter a Name";
  const data = Records;

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.Name?.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleClick = (name) => {
    setPerson(name);
  };

  console.log(filteredData, wordEntered, data);

  return (
    <div className="dashboard-body">
      <Navbar index="4" />
      <div className="top">
        <div className="search">
          <div className="searchInputs">
            <input
              type="text"
              placeholder={placeholder}
              value={wordEntered}
              onChange={handleFilter}
            />
            <div className="searchIcon">
              {filteredData.length === 0 ? (
                // <SearchIcon />
                <p>search</p>
              ) : (
                // <CloseIcon id="clearBtn" onClick={clearInput} />
                <p id="clearBtn" onClick={clearInput}>
                  clear
                </p>
              )}
            </div>
          </div>
          {filteredData.length != 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 15).map((value) => {
                return (
                  <p
                    className="dataItem"
                    value={value.Name}
                    onClick={() => handleClick(value.Name)}
                    target="_blank"
                  >
                    <p>{value.Name} </p>
                  </p>
                );
              })}
            </div>
          )}
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          data-placeholder="Choose category"
          required
        >
          <option value=""></option>
          <option>Doubt</option>
          <option>Informative</option>
        </select>
      </div>
    </div>
  );
};

export default Safezone;
