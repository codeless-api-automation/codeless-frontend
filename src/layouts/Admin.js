import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import Notifications from "features/notifications/Notifications.js";

import {
  dashboardRoutes,
  otherRoutes,
  allRoutes
} from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";

let ps;

const switchRoutes = (
  <Switch>
    {otherRoutes.concat(dashboardRoutes).map((prop, key) => {
      if (prop.layout === "/general") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/general" to="/general/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef(null);
  // states and functions
  const [image] = React.useState(bgImage);
  const [color] = React.useState("purple");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1 && mainPanel.current) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1 && mainPanel.current) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={dashboardRoutes}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel}>
        <Navbar
          routes={allRoutes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content} style={{ paddingTop: '0px' }}>
          <div className={classes.container}>{switchRoutes}</div>
          <Notifications />
        </div>
      </div>
    </div>
  );
}
