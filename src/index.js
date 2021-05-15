import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import { Provider } from "react-redux";
import { configureStore } from "./store/store";

import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

import ProtectedRoute from "route/ProtectedRoute"

import SignUp from "views/SignUp/SignUp"
import SignIn from "views/SignIn/SignIn"

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

        <ProtectedRoute path="/general">
          <Admin />
        </ProtectedRoute>

        <Route path="/general" component={Admin} />
        <Redirect from="/" to="/general/dashboard" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
