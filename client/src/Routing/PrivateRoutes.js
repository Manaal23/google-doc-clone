import React from 'react'
import TextEditor from "../pages/TextEditor/TextEditor"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import Login from "../pages/Login/Login"
import PrivateGuard from './PrivateGuard'
import NotFound404 from '../pages/NotFound/NotFound'
import Home from '../pages/Home/Home'

function PrivateRoutes () {

  return (
    <Switch>

      <PrivateGuard path="/" component={Login} exact />
      <PrivateGuard path="/login" component={Login} exact />
      <PrivateGuard path="/documents/home" component={Home} exact />
      <PrivateGuard path={`/documents/:id`} component={TextEditor} exact/>

      <Route path="*" component={NotFound404} exact />
      
    </Switch>
  )
}

export default PrivateRoutes