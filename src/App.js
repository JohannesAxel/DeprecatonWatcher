import './App.scss';
import SideBar from './SideBar/SideBar';
import Endpoints from './Endpoints/Endpoints';
import Developers from './Developers/Developers';
import Paper from '@material-ui/core/Paper';
import {useEffect, useState} from 'react'
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
      <div className="header">
        <div className="title unmark-text">
          Endpoint Watcher
        </div>
      </div> 
      <div className="main">
      <Router>
        <SideBar pages={sideBarStruct}/>
          <div className="info-container">
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
    </div>
  );
}

export default App;
