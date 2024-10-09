import React from "react";
import facebook from "../assets/facebook.png";
import twitter from "../assets/twitter.png";
import link from "../assets/link.png";
import phone from "../assets/phone.png";
import location from "../assets/location.png";
import mail from "../assets/mail.png";
import "../styles/footer.css";

const Footer = () => {
  return (
    <div className="overall">
      <div className="foot ">
        <div>
          <h1>Contact Us</h1>
          <div></div>
        </div>
        <form action="">
          <div className="mail">
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
          </div>
          <div id="mail">
            <input type="text" placeholder="Message" />
            <button>Send message</button>
          </div>
        </form>
      </div>
      <div className="footer">
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
        <div className="location">
          <div>
            <div className="ikota">
              <img src={location} alt="" />
              <p>Road 26 House 8A Ikota Villa Estate, Lekki Lagos State</p>
            </div>
            <div className="ikota">
              <img src={phone} alt="" />
              <p>+234 805 835 8897</p>
            </div>
            <div className="ikota">
              <img src={mail} alt="" />
              <p>tetranglesproject@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
