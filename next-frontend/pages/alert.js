import React, { useState } from "react";
import Navbar from "../components/navbar";
import Records from "./data.json";

const alert = () => {
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

  return (
    <div className="alert-body">
      <Navbar index="2" />
      alert
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
      </div>
    </div>
  );
};

export default alert;
