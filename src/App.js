import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import history from './history';
import Dashboard from './layout/Dashboard';
// import { Test } from './Test';
import LandingPage from './layout/LandingPage';
import { Route } from "react-router-dom";
import { ContextProvider } from './Context';

export default function App() {
  return (
    <ContextProvider>
      <Router history={history}>
        <Route exact path="/" component={LandingPage} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </ContextProvider>
  );
}