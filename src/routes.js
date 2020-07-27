/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Settings from '@material-ui/icons/Settings';
import Explore from '@material-ui/icons/Explore';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import TestExplorer from "views/TestExplorer/TestExplorer.js";
import Integrations from "views/Integrations/Integrations.js";
import TestCase from "views/TestCaseMngmnt/TestCase.js"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/general"
  },
  
  {
    path: "/test-case",
    name: "Test Case Management",
    icon: "content_paste",
    component: TestCase,
    layout: "/general"
  },
  {
    path: "/explorer",
    name: "Test Explorer",
    icon: Explore,
    component: TestExplorer,
    layout: "/general"
  },
  {
    path: "/integrations",
    name: "Integrations",
    icon: Settings,
    component: Integrations,
    layout: "/general"
  }
];

export default dashboardRoutes;
