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
import List from '@material-ui/icons/List';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import Integrations from "views/Integrations/Integrations.js";
import Collections from "views/Collections/Collections.js";
import Probe from "views/Probe/Probe.js"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/general"
  },
  
  {
    path: "/probe",
    name: "Probe",
    icon: "content_paste",
    component: Probe,
    layout: "/general"
  },
  {
    path: "/collections",
    name: "Collections",
    icon: List,
    component: Collections,
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
