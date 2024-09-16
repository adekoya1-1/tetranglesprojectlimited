import React from "react";
import redarrow from "../assets/redarrow.png";
import "../About styles/bridge.css";
import bridge from "../assets/bridge.png";

const Bridge = () => {
  return (
    <div className="bridge">
      <div className="brid">
        <div className="rmate">
          <div className="rarrow">
            <img src={redarrow} alt="" />
            <div className="rfri">
              <h5>Eco Friendly Construction</h5>
              <p>
                We emphasizes sustainable materials, energy efficiency, and
                minimizing waste to create environmentally responsible and
                resource-efficient buildings.
              </p>
            </div>
          </div>
          <div className="rarrow">
            <img src={redarrow} alt="" />
            <div className="rfri">
              <h5>The Newest Technology Repairs</h5>
              <p>
                We make use of the newest technology in construction repairs
                which includes drones, and smart sensors, enabling faster,
                precise, and cost-effective solutions.
              </p>
            </div>
          </div>
          <div className="rarrow">
            <img src={redarrow} alt="" />
            <div className="rfri">
              <h5>High Quality Construction Management</h5>
              <p>
                We ensures projects are completed on time, within budget, and to
                the highest standards of safety and efficiency.
              </p>
            </div>
          </div>
        </div>
        <div id="img">
          <img id="img" src={bridge} alt="" />
        </div>
      </div>
      <div id="section">
        <section className="section">
          <div id="esta">
            <h3>12</h3>
            <h6>YEARS ESTABLISHED</h6>
          </div>
          <div id="leted">
            <h3>250</h3>
            <h6>COMPLETED PROJECTS</h6>
          </div>
        </section>
        <section className="section">
          <div id="worker">
            <h3>24</h3>
            <h6>FIELD WORKERS</h6>
          </div>
          <div id="worker">
            <h3>18</h3>
            <h6>OFFICE STAFF</h6>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Bridge;
