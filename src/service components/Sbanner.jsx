import React from "react";
import redconc from "../assets/conred.png";
import redbuild from "../assets/repaired.png";
import redpaint from "../assets/paintingred.png";
import line from "../assets/line.png";
import "../services styles/servicesbanner.css";

const Sbanner = () => {
  return (
    <div>
      <div id="dyn">
        <div id="about">
          <div id="dynamic">
            <div id="line">
              <img className="line" src={line} alt="" />
              <h1>Our Construction Services</h1>
            </div>
            <p>
              We are a dynamic construction company specializing in innovative
              infrastructure and real estate development. With a strong
              commitment to quality and sustainability, our company delivers
              cutting-edge projects that meet the highest standards.
            </p>
          </div>
          <div id="wot">
            <h3 id="wat">What We Do</h3>
            <div>
              <div id="buildings">
                <div>
                  <img id="image" src={redconc} alt="" />
                </div>
                <div id="building">
                  <h6>Building Construction</h6>
                  <p>
                    Involves planning, designing, and assembling structures
                    using various materials.
                  </p>
                </div>
              </div>
              <div id="buildings">
                <div>
                  <img id="image" src={redbuild} alt="" />
                </div>
                <div id="building">
                  <h6>Building Repairs</h6>
                  <p>
                    Essential maintenance preserves building integrity, ensuring
                    safety and longevity.
                  </p>
                </div>
              </div>
              <div id="buildings">
                <div>
                  <img id="image" src={redpaint} alt="" />
                </div>
                <div id="building">
                  <h6>Custom Design</h6>
                  <p>
                    Transforming spaces, exterior painting enhances aesthetics
                    and protects surfaces effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sbanner;
