import React from "react";

import * as componentsPaths from "constants/ComponentsPaths.js";

import { Icon } from "@material-ui/core";

import {
  Dashboard,
  InsertChartOutlined
} from "@material-ui/icons";

import DashboardPage from "views/Dashboard/Dashboard.js";
import HealthChecksContainer from "views/HealthChecks/HealthChecksContainer.js"
import HealthCheck from "views/HealthChecks/HealthCheck.js"
import ExecutionsContainer from "views/Executions/ExecutionsContainer";

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
  },
  {
    path: "/executions",
    name: "Executions",
    icon: InsertChartOutlined,
    component: ExecutionsContainer,
    layout: "/general"
  }
];

export const otherRoutes = [
  {
    path: "/health-checks/new",
    name: "Health check",
    component: HealthCheck,
    layout: "/general",
    previousRoute: componentsPaths.VIEW_HEALTH_CHECKS
  }
];

export const allRoutes = dashboardRoutes.concat(otherRoutes);