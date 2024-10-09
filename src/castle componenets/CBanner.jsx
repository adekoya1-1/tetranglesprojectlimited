import React from "react";
import "../castle componenets/cbanner.css";
import line from "../assets/line.png";
const CBanner = () => {
  return (
    <div className="ln">
      <div id="loop">
        <h2 className="loop">
          <img src={line} alt="" />
          Castle Project
        </h2>
        <p>
          Castle project is a residential building situated in Magamound Estate,
          Lekky County Home, Ikota.
        </p>
      </div>
      <div className="date">
        <p>Date: 2022</p>
        <p>Client:</p>
        <p>Project type: Building Construction</p>
      </div>
    </div>
  );
};

export default CBanner;
