import React from "react"
import { Switch, Route } from "react-router"
import Auth from "../pages/Auth"
import Home from "../pages/Home"
import Nav from "./Nav"

const App = (props) => {
  return <>
  <Nav/>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/auth/:form" component={Auth}/>
  </Switch>
  </>
};

export default App

