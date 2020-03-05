/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import AdminNavbarRightLinks from "./AdminNavbarRightLinks.jsx";
import logo from "assets/img/logo-pelatro.png";

class Header extends Component {
  constructor(props) {
    super(props);
    this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
    this.state = {
      sidebarExists: false,
      toggle: false
    };
  }
  mobileSidebarToggle(e) {
    if (this.state.sidebarExists === false) {
      this.setState({
        sidebarExists: true
      });
    }
    e.preventDefault();
    document.documentElement.classList.toggle("nav-open");
    var node = document.createElement("div");
    node.id = "bodyClick";
    node.onclick = function() {
      this.parentElement.removeChild(this);
      document.documentElement.classList.toggle("nav-open");
    };
    document.body.appendChild(node);
  }

  toggleHeader() {
    this.setState({toggle: !this.state.toggle})
    console.log("toggglee", this.state.toggle)
  }

  render() {
    return (
      <Navbar fluid className={(this.state.toggle ? "nav-full" : "nav-mini")}  onSelect={(selected) => {
        console.log("selected>>>>", selected)

        this.props.history.push(selected)
      }}>

        <Navbar.Header>
          <Navbar.Brand>
            <img src={logo} alt="logo_image" className="pearl-logo"/>
          </Navbar.Brand>
          <Navbar.Toggle onClick={this.mobileSidebarToggle} />
        </Navbar.Header>
        <Navbar.Collapse>
          <AdminNavbarLinks {...this.props} />

          <AdminNavbarRightLinks {...this.props}/>

        </Navbar.Collapse>
      </Navbar>
      
      
    );
  }
}

export default Header;
