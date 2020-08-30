import Dashboard from "@material-ui/icons/Dashboard";
import Cloud from '@material-ui/icons/Cloud';

import DashboardPage from "views/Dashboard/Dashboard.js";
import Probes from "views/Probes/Probes.js"
import Probe from "views/Probes/Probe.js"

export const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/general"
  },
  {
    path: "/probes",
    name: "Probes",
    icon: Cloud,
    component: Probes,
    layout: "/general"
  }
];

export const routesContainer = [
  {
    path: "/probes/create",
    name: "Create a probe",
    component: Probe,
    layout: "/general"
  }
];