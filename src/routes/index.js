import React from "react";
import { Switch, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicLayout from "./layout/PublicLayout";

const Routes = () => {
  return (
    <Switch>
      <ProtectedRoute path="/admin" />
      <Route path="/" component={PublicLayout} />
    </Switch>
  );
};

export default Routes;
