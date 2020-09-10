import React from "react";

import { Icon } from "@material-ui/core";

import Dashboard from "@material-ui/icons/Dashboard";

import DashboardPage from "views/Dashboard/Dashboard.js";
import HealthChecksContainer from "views/HealthChecks/HealthChecksContainer.js"
import HealthCheck from "views/HealthChecks/HealthCheck.js"

function Heartbeat() {
  return <Icon className="fa fa-heartbeat" style={{ float: 'left', marginRight: '15px' }} />;
}

export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/general"
  },
  {
    path: "/health-checks",
    name: "Health checks",
    icon: Heartbeat,
    component: HealthChecksContainer,
    layout: "/general"
  }
];

export const routesContainer = [
  {
    path: "/health-checks/create",
    name: "Create a health check",
    component: HealthCheck,
    layout: "/general"
  }
];