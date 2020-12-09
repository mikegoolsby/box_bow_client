import React from "react"
import { Switch, Route } from "react-router"
import {useAppState} from "../AppState.jsx"
import Auth from "../pages/Auth"
import Home from "../pages/Home"
import Listbuilder from "../pages/Listbuilder"
import Nav from "./Nav"
import ScrollableTabsButtonForce from "./NavHeader.jsx"

const App = (props) => {
  const {state, dispatch} = useAppState()
  React.useState(() => {
    const auth = JSON.parse(window.localStorage.getItem("auth"))
    if (auth) {
      dispatch({type: "auth", payload: auth})
      props.history.push("/listbuilder")
    } else {
      props.history.push("/")
    }
  })

  
  return <>
  <h1>Box & Bow</h1>
  <ScrollableTabsButtonForce/>
  {/* <Nav/> */}
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/auth/:form" component={Auth}/>
    {/* <Route exact path ="/listbuilder" component={Listbuilder} /> */}
  </Switch>
  </>
};

export default App

