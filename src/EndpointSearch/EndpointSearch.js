
import { TableContainer } from '@material-ui/core';
import SearchTable from '../SearchTable/SearchTable';
import './EndpointSearch.scss';
function App() {
  return (
    <>
      <div className="title-4 unmark-text">
        Endpoint search
      </div>
      <div className="search-field">
        <input type="text" placeholder="Search"/>
      </div>
      <SearchTable/>
  </>
  );
}

export default App;


