import React from "react";
import arr from "../assets/arrow.png";
import "../Home styles/eco.css";

const Eco = () => {
  return (
    <div className="ret">
      <div className="eco">
        <div className="mate">
          <div className="arrow">
            <img src={arr} alt="" />
            <div className="fri">
              <h5>Eco Friendly Construction</h5>
              <p>
                We emphasizes sustainable materials, energy efficiency, and
                minimizing waste to create environmentally responsible and
                resource-efficient buildings.
              </p>
            </div>
          </div>
          <div className="arrow">
            <img src={arr} alt="" />
            <div className="fri">
              <h5>The Newest Technology Repairs</h5>
              <p>
               We make use of the newest technology in construction repairs which  includes drones, and smart sensors, enabling faster, precise, and cost-effective solutions.
              </p>
            </div>
          </div>
          <div className="arrow">
            <img src={arr} alt="" />
            <div className="fri">
              <h5>High Quality Construction Management</h5>
              <p>
                We ensures projects are completed on time, within budget, and to the highest standards of safety and efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="too">
        <h2>No Project Too Big Or Too Small</h2>
        <hr className="hbants" />
        <div className="lectus">
          <p className="first">
            Lectus erat, consectetur eu sapien eget rhoncus consectetur sem.
            Proin cursus, dolor a mollis consectetur, risus dolor fermentum
            massa, a commodo elit dui sit amet risus. Maecenas ornare nisl a
            tortor ultrices bibendum. Nulla fermentum, metus quis sodales
            tristique, augue mauris molestie augue, non feugiat ligula neque nec
            felis
          </p>
          <p className="second">
            Lectus erat, consectetur eu sapien eget rhoncus consectetur sem.
            Proin cursus, dolor a mollis consectetur, risus dolor fermentum
            massa, a commodo elit dui sit amet risus. Maecenas ornare nisl a
            tortor ultrices bibendum. Nulla fermentum, metus quis sodales
            tristique, augue mauris molestie augue, non feugiat ligula neque nec
            felis{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Eco;
