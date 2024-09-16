import React from "react";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import link from "../assets/link.png";
import phone from "../assets/phone.png";
import location from "../assets/location.png"
import mail from "../assets/mail.png"
import '../styles/footer.css'

const Footer = () => {
  return (
    <div className="last">
      <div className="contact">
        <h4>contact stuff</h4>
      </div>
      <div>
        <div className="foot">
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
        <div className="footer">
          <div>
            <img src={location} alt="" />
            <p>Road 26 House 8A Ikota Villa Estate, Lekki Lagos State</p>
          </div>
          <div>
            <img src={phone} alt="" />
            <p>+234 805 835 8897</p>
          </div>
          <div>
            <img src={mail} alt="" />
            <p>tetranglesproject@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
