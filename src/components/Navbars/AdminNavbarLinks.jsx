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
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { Route, Switch } from "react-router-dom";
import queryString from 'query-string'

class AdminNavbarLinks extends Component {

    constructor(props) {
    super(props);
    console.log(props)
    if(props.location.debug){
      this.queryString="?debug="+props.location.debug;
    }
    else{
      this.queryString="";
    }
  }
  showUpdateComponent = () =>{
    console.log("query",this.props.location) // "top"
    if(this.props.location.debug!=='undefined'){
      if(this.props.location.debug === 'true'){
        return(
          <NavItem  eventKey="update"  class="pearMenu">
            
            <p>Update Policy</p>
          </NavItem>          
        )
      }
      else{
        return null
      }
    }
    else{
      return null
    }
  }
  render() {

    return (
      <div>
        <Nav pullLeft>
          <NavItem eventKey="area" class="pearMenu">
            
            <p>Area of Interest</p>
          </NavItem>
          {this.showUpdateComponent()}

          {/*<NavItem eventKey="settings" class="pearMenu">
            
            <p>Settings</p>
    </NavItem> */}

         
        </Nav>


      
      </div>
    );
  }
}

export default AdminNavbarLinks;
