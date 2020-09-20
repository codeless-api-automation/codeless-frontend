import React from "react";
import { useHistory } from "react-router-dom";

import classNames from "classnames";
import PropTypes from "prop-types";
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Hidden
} from "@material-ui/core";

import Menu from "@material-ui/icons/Menu";

import AdminNavbarLinks from "./AdminNavbarLinks.js";
import Button from "components/CustomButtons/Button.js";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";

import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const classes = useStyles();

  function getRouteInfo() {
    return props.routes.find(prop => window.location.href.endsWith(prop.layout + prop.path));
  }
  let { name, previousRoute } = getRouteInfo();

  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });

  const history = useHistory();
  const changeRoute = (newPath) => {
    history.push(newPath);
  }

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button
            color="transparent"
            className={classes.title}
            onClick={() => changeRoute(previousRoute)}>
            {previousRoute !== undefined &&
              <ArrowBackIos />
            }
            {name}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          {<AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};
