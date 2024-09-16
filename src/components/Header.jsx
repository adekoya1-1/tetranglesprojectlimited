import React from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from '../assets/logo.png'

const Header = () => {
  return (
    <div>
      <Navbar expand="lg" className="gut">
        <Container id="cont">
          <Link id="home" to="/">
          <Navbar.Brand id="comp">
              <img src={logo } alt="" />
            </Navbar.Brand>
          </Link>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" id="nav">
                <Link className="link" to=" /project">
                  Projects
                </Link>
                <Link className="link" to="/contact">
                  Contact
                </Link>
                <Link className="link" to="/about">
                  About
                </Link>
                <Link className="link" to="/service">
                  Services
                </Link>
                <Link className="link" to="/">
                  Home
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
