import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";

class AdminNavbarRightLinks extends Component {
  
  render() {
    const notification = (
      <div>
        <i className="fa fa-bell" />
        <b className="caret" />
        <span className="notification">5</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    const login = (
      <div>
        <i className="fa fa-user" />
        <b className="caret" />
        
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );
    return (
      <div>
        <Nav pullRight>
        <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Notification 1</MenuItem>
            <MenuItem eventKey={2.2}>Notification 2</MenuItem>
            <MenuItem eventKey={2.3}>Notification 3</MenuItem>
            <MenuItem eventKey={2.4}>Notification 4</MenuItem>
            <MenuItem eventKey={2.5}>Another notifications</MenuItem>
          </NavDropdown>
          <NavDropdown
            eventKey={2}
            title={login}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>Logout</MenuItem>
           
          </NavDropdown>
          </Nav>
      
      </div>
    );
  }
}

export default AdminNavbarRightLinks;
