import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "./store/store";

import SignUp from "layouts/SignUp.js"
import SignIn from "layouts/SignIn.js"
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

import ProtectedRoute from "route/ProtectedRoute"

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router history={hist}>
      <Switch>
        <Route path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <ProtectedRoute path="/">
          <Route path="/general" component={Admin} />
          <Redirect from="/" to="/general/dashboard" />
        </ProtectedRoute>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
