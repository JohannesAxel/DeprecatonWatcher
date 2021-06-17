import './App.scss';
import Endpoints from './Endpoints/Endpoints';
import Developers from './Developers/Developers';
import Paper from '@material-ui/core/Paper';
import {useEffect, useState} from 'react'

import Header from './Header/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useRouteMatch
} from "react-router-dom";

const sideBarStruct = [
  {name: "Endpoints", path:"/endpoints"},
  {name: "Developers", path:"/developers"}
]

function App() {
  

  return (
    <div className="page-container">
      <Router>
        <div className="header">
          <Header pages={sideBarStruct}/>
        </div> 
        <div className="main">
          <Switch>
            <Redirect exact from="/" to="/endpoints"/>
            <Route path="/endpoints">
              <Endpoints/>
            </Route>
            <Route path="/developers">
              <Developers/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
