import Dashboard from "@material-ui/icons/Dashboard";

import DashboardPage from "views/Dashboard/Dashboard.js";
import HealthChecksContainer from "views/HealthChecks/HealthChecksContainer.js"
import HealthCheck from "views/HealthChecks/HealthCheck.js"

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
    icon: "",
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