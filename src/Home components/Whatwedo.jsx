import React from "react";
import conc from "../assets/buildingconc.png";
import build from '../assets/buildingrepair.png'
import demo from '../assets/demolition.png'
import found from '../assets/foundation.png'
import paint from '../assets/painting.png'
import site from '../assets/sitemanagement.png'
import "../Home styles/whatwedo.css";

const Whatwedo = () => {
  return (
    <div className="do">
      <div className="ings">
        <div className="buildings">
          <div>
            <img className="image" src={conc} alt="" />
          </div>
          <div className="building">
            <h6>Building Construction</h6>
            <p>
              Involves planning, designing, and assembling structures using various materials.
            </p>
          </div>
        </div>
        <div className="buildings">
          <div>
            <img className="image" src={build} alt="" />
          </div>
          <div className="building">
            <h6>Building Repairs</h6>
            <p>
              Essential maintenance preserves building integrity, ensuring safety and longevity.
            </p>
          </div>
        </div>
      </div>
      <div className="alt">
        <div className="buildings">
          <div>
            <img className="image" src={demo} alt="" />
          </div>
          <div className="building">
            <h6>Demolition</h6>
            <p>
              Carefully planned demolition clearing old structures, paving way for new.
            </p>
          </div>
        </div>
        <div className="buildings">
          <div>
            <img className="image" src={found} alt="" />
          </div>
          <div className="building">
            <h6>Foundation</h6>
            <p>
              Strong foundations support structures, ensuring stability and longevity for buildings.
            </p>
          </div>
        </div>
      </div>
      <div className="elit">
        <div className="buildings">
          <div>
            <img className="image" src={paint} alt="" />
          </div>
          <div className="building">
            <h6>Painting & Exterior</h6>
            <p>
              Transforming spaces, exterior painting enhances aesthetics and protects surfaces effectively.
            </p>
          </div>
        </div>
        <div className="buildings">
          <div>
            <img className="image" src={site} alt="" />
          </div>
          <div className="building">
            <h6>Site Management</h6>
            <p>
              Effective site management ensures safety, efficiency, and successful project completion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Whatwedo;
