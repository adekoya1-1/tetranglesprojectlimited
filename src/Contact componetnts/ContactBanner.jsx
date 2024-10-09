import React from "react";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import link from "../assets/link.png";
import "../Contact componetnts/contactbanner.css"

const ContactBanner = () => {
  return (
    <div>
      <div id="concts">
        <div className="concts">
          <div>
            <h1>CONTACT US</h1>
            <div></div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis
            egestas pellentesque libero dolor in diam consequat ut. Mi nibh amet
            viverra id aliquet neque odio.
          </p>
          <button>SEND A MESSAGE</button>
        </div>
        <div>
          <h4>Contact Info</h4>
          <div>
            <h6>Our Office</h6>
            <p>Road 26 house 8A ikota villa estate, ikota lekki Lagos state</p>
          </div>
          <div>
            <h6>Office Open Hours</h6>
            <p>M-F: 9am - 6pm</p>
            <p>S-S: 10am - 4pm</p>
          </div>
          <div>
            <h6>Get In Touch</h6>
            <div>
              <a href="">tetranglesprojectlimited.com</a>
              <a href="">+234 805 835 8897</a>
            </div>
          </div>
          <div className="icon">
            <a href="">
              <img src={facebook} alt="" />
            </a>
            <a href="">
              <img src={twitter} alt="" />
            </a>
            <a href="">
              <img src={link} alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
