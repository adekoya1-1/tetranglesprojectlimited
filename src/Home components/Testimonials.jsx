import React from "react";
import "../Home styles/testimonial.css";
import stars from "../assets/stars.png";
const Testimonials = () => {
  return (
    <div className="test">
      <div className="als">
        <h2 >Client Testimonials</h2>
        <hr className="sit"/>
      </div>
      <div className="ipsum">
        <div className="moni">
          <img src={stars} alt="" />
          <p>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien,
            dignissim tristique tellus sed faucibus nullam.”
          </p>
          <h6>Jhon Doe</h6>
        </div>
        <div className="moni">
          <img src={stars} alt="" />
          <p>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien,
            dignissim tristique tellus sed faucibus nullam.”
          </p>
          <h6>Jhon Doe</h6>
        </div>
        <div className="monis">
          <img src={stars} alt="" />
          <p>
            “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien,
            dignissim tristique tellus sed faucibus nullam.”
          </p>
          <h6>Jhon Doe</h6>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
