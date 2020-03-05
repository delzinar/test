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
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";
import queryString from 'query-string'
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
//import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import { style } from "variables/Variables.jsx";

import routes from "routes.js";

import image from "assets/img/sidebar-3.jpg";

import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import '../assets/sass/main.scss';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.adminNavbar = React.createRef();
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "white",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open",
      sidebarOpen: false
    };
    this.values = queryString.parse(this.props.location.search);
  }
  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    let level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    //var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    let level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }

    // _notificationSystem.addNotification({
    //   title: <span data-notify="icon" className="pe-7s-gift" />,
    //   message: (
    //     <div>
    //       Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
    //       every web developer.
    //     </div>
    //   ),
    //   level: level,
    //   position: "tr",
    //   autoDismiss: 15
    // });
  
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  toggleNavigation = () => {
    this.setState(prevState => ({
      sidebarOpen: !prevState.sidebarOpen
    }))
    this.toggleHeader()
  }

  toggleHeader = () => {
    this.adminNavbar.current.toggleHeader();
  };

  showUpdateComponent = () =>{
    console.log("query",this.values.debug) // "top"
    if(this.values.debug!=='undefined'){
      if(this.values.debug === 'true'){
        return(
          <NavItem eventKey="update">
            <NavIcon>
              <i className="pe-7s-note2" style={{ fontSize: '1.75em' }} />
            </NavIcon>
            <NavText>
              Update Policy
            </NavText>
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
      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />
        {/*<Sidebar {...this.props} routes={routes} image={this.state.image}*/}
        {/*color={this.state.color}*/}
        {/*hasImage={this.state.hasImage}/>*/}

        <div id="main-panel" className="main-panel" ref="mainPanel">
          {/*<SideNav
              onSelect={(selected) => {
                console.log("selected>>>>", selected)

                this.props.history.push(selected)
              }}
              onToggle={this.toggleNavigation}
          >
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="home">
             { /*<NavItem eventKey="dashboard">
                <NavIcon>
                  <i className="pe-7s-graph" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  DASHBOARD
                </NavText>
              </NavItem>*/
            }
{/*
              {this.showUpdateComponent()}
              <NavItem eventKey="area">
                <NavIcon>
                  <i className="pe-7s-note2" style={{ fontSize: '1.75em' }} />
                </NavIcon>
                <NavText>
                  Area of Interest
                </NavText>
              </NavItem>              
            </SideNav.Nav>
          </SideNav>
          */}
          <AdminNavbar
            ref={this.adminNavbar}
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            location = {this.values}
          />
          <div className={"main-content" + ' ' + (this.state.sidebarOpen ? "sidebar-full" : "sidebar-mini")}>
            <Switch>{this.getRoutes(routes)}</Switch>
          </div>
 
          
          <div className={"footer-wrapper" + ' ' + (this.state.sidebarOpen ? "footer-full" : "footer-mini")}>
            <Footer />
          </div>

         {/* <FixedPlugin */}
        </div>
      </div>
    );
  }
}

export default Admin;
