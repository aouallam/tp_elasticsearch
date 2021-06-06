import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import Home from '../views/home'
import Login from '../views/login'
import Register from '../views/register'
import PrivateRoutes from '../helpers/protected.routes'

const Routes = () => {
    return (
      <Switch>
        <PrivateRoutes exact path="/">
          <Home />
        </PrivateRoutes>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    )
}
export default Routes
