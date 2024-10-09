import React from "react";
import sixone from "../assets/castle.png";
import "../castle componenets/Acastle.css";
import castlemain from "../assets/castlemain.png";
import castlecloset from "../assets/castlecloset.png";
const Aboutcastle = () => {
  return (
    <div className=" container">
      <div className="risus">
        <div className="sapien">
          <h1>About This Project</h1>
          <div></div>
          <p>
            Lectus erat, consectetur eu sapien eget rhoncus consectetur sem.
            Proin cursus, dolor a mollis consectetur, risus dolor fermentum
            massa, a commodo elit dui sit amet risus.
          </p>
          <ul>
            <li>Maecenas ornare nisl</li>
            <li>Maecenas ornare nisl</li>
            <li>Maecenas ornare nisl</li>
            <li>Maecenas ornare nisl</li>
            <li>Maecenas ornare nisl</li>
          </ul>
        </div>
        <img src={sixone} alt="" />
      </div>
      <div>
        <img id="main" src={castlemain} alt="" />
      </div>
      <div id="closet">
        <img  src={castlecloset} alt="" />
        <p>
          Lorem ipsum dolor sit consectetur adipiscing elit. Nullam lectus erat,
          consectetur eu sapien eget rhoncus consectetur sem. Proin cursus,
          dolor a mollis consectetur, risus dolor fermentum massa, a commodo
          elit dui sit amet risus. Maecenas ornare nisl a tortor ultrices
          bibendum. Nulla fermentum, metus quis sodales tristique, augue mauris
          molestie augue non feugiat ligula neque nec felis. Lectus erat,
          consectetur eu sapien eget rhoncus consectetur sem. Proin cursus,
          dolor a mollis consectetur, risus dolor fermentum massa, a commodo
          elit dui sit amet risus. Maecenas ornare nisl a tortor ultrices
          bibendum. Nulla fermentum, metus quis sodales tristique, augue mauris
          molestie augue, non feugiat ligula neque nec felis.
        </p>
      </div>
    </div>
  );
};

export default Aboutcastle;
