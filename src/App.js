import './App.scss';
import SideBar from './SideBar/SideBar';
import EndpointSearch from './EndpointSearch/EndpointSearch';
import DeveloperSearch from './DeveloperSearch/DeveloperSearch';
import Paper from '@material-ui/core/Paper';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";



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
        <SideBar pages={[{name: "Endpoint Search", path:"/endpoints"}, {name: "Developer Search", path:"/developers"}]}/>
          <div className="info-container">
              <Switch>
                <Route exact path="/endpoints">
                  <EndpointSearch/>
                </Route>
                <Route path="/developers">
                  <DeveloperSearch/>
                </Route>
                <Route path="/">
                  <EndpointSearch/>
                </Route>
              </Switch>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
