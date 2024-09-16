import React from "react";
import castle from "../assets/castle.png";
import "../services styles/miniproject.css";

const Miniprojects = () => {
  return (
    <div id="dash">
      <section className="ltd">
        <h1>Latest Projects</h1>
        <div className="dashs"></div>
      </section>
      <div className="mini">
        <div id="one">
          <img className="castle" src={castle} alt="" />
          <div id="castle">
            <h6>Castle Project</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id et
              euismod bibendum adipiscing et orci, fermentum.{" "}
            </p>
            <button>LEARN MORE</button>
          </div>
        </div>
        <div id="one">
          <img className="castle" src={castle} alt="" />
          <div id="castle">
            <h6>Castle Project</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id et
              euismod bibendum adipiscing et orci, fermentum.{" "}
            </p>
            <button>LEARN MORE</button>
          </div>
        </div>
        <div id="one">
          <img className="castle" src={castle} alt="" />
          <div id="castle">
            <h6>Castle Project</h6>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id et
              euismod bibendum adipiscing et orci, fermentum.{" "}
            </p>
            <button>LEARN MORE</button>
          </div>
        </div>
      </div>
      <div id="all">
        <button className="all">View All</button>
        </div>
    </div>
  );
};

export default Miniprojects;
