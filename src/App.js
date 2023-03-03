// import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import "react-loading-skeleton/dist/skeleton.css";
import * as dotenv from "dotenv";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";
import { Login, PageNotFound } from "./view/Auth";
import { ProtectedRoute } from "./hooks";
import {
  Airtime,
  Overview,
  Customers,
  Requests,
  CIT,
  Others,
  Data,
  CableTV,
  Electricty,
  PendingReview,
  ApprovedReview,
  CustomerReview,
} from "./view/Dashboard";

import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  dotenv.config();

  return (
    <>
      <SkeletonTheme>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/login" component={Login} />
            <ProtectedRoute path="/dashboard" component={Overview} />
            <ProtectedRoute path="/customers" component={Customers} />
            <ProtectedRoute path="/requests" component={Requests} />
            <ProtectedRoute path="/cit" component={CIT} />
            <ProtectedRoute path="/others" component={Others} />
            <ProtectedRoute path="/airtime" component={Airtime} />
            <ProtectedRoute path="/data" component={Data} />
            <ProtectedRoute path="/cable" component={CableTV} />
            <ProtectedRoute path="/electricity" component={Electricty} />
            <ProtectedRoute path="/pending-review" component={PendingReview} />
            <ProtectedRoute
              path="/customer-review"
              component={CustomerReview}
            />
            <ProtectedRoute
              path="/approved-review"
              component={ApprovedReview}
            />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      </SkeletonTheme>
    </>
  );
}

export default App;
