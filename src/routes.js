import React from "react";

import * as componentsPaths from "constants/ComponentsPaths.js";

import { Icon } from "@material-ui/core";

import {
  Dashboard,
  InsertChartOutlined,
  ScheduleOutlined
} from "@material-ui/icons";

import DashboardPage from "views/Dashboard/Dashboard.js";

import CreateSchedule from "views/CanaryTests/CreateSchedule";

import ExecutionsContainer from "views/Executions/ExecutionsContainer.js";
import Execution from "views/Executions/Execution.js";

import SchedulesContainer from "views/Schedules/SchedulesContainer";
import ScheduleDetail from "views/Schedules/ScheduleDetail";
import CanaryTest from "views/CanaryTests/CanaryTest";
import CanaryTestsContainer from "views/CanaryTests/CanaryTestsContainer";


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
    path: "/canary-tests",
    name: "Canary tests",
    icon: Heartbeat,
    component: CanaryTestsContainer,
    layout: "/general"
  },
  {
    path: "/executions",
    name: "Executions",
    icon: InsertChartOutlined,
    component: ExecutionsContainer,
    layout: "/general"
  },
  {
    path: "/schedules",
    name: "Schedules",
    icon: ScheduleOutlined,
    component: SchedulesContainer,
    layout: "/general"
  }
];

export const otherRoutes = [
  {
    path: "/canary-tests/save",
    name: "Canary test",
    component: CanaryTest,
    layout: "/general",
    previousRoute: componentsPaths.VIEW_CANARY_TESTS
  },
  {
    path: "/executions/view",
    name: "Execution",
    component: Execution,
    layout: "/general",
    previousRoute: componentsPaths.VIEW_EXECUTIONS
  },
  {
    path: "/canary-tests/schedule",
    name: "Schedule",
    component: CreateSchedule,
    layout: "/general",
    previousRoute: componentsPaths.VIEW_CANARY_TESTS
  },
  {
    path: "/schedules/schedule",
    name: "Schedule",
    component: ScheduleDetail,
    layout: "/general",
    previousRoute: componentsPaths.VIEW_SCHEDULES
  }
];

export const allRoutes = dashboardRoutes.concat(otherRoutes);