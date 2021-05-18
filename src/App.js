import './App.scss';
import SideBar from './SideBar/SideBar';
import EndpointSearch from './EndpointSearch/EndpointSearch';
function App() {
  return (
    <div className="page-container">
      <div className="header">
        <div className="title unmark-text">
          Endpoint Watcher
        </div>
      </div>
      <div className="main">
        <SideBar/>
        <div className="info-container">
          <EndpointSearch/>
        </div>
      </div>
    </div>
  );
}

export default App;
