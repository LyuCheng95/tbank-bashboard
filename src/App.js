import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import history from './history';
import Dashboard from './layout/Dashboard';
import LandingPage from './layout/LandingPage';
import {
  Switch,
  Route,
} from "react-router-dom";

export default function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}