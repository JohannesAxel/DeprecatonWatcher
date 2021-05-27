import EndpointSearch from "./EndpointSearch/EndpointSearch"
import Endpoint from "./Endpoint/Endpoint"

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
function App(props) {
  let match = useRouteMatch();

  return (
    <>
    <Switch>
      <Route path={`${match.path}/:id`}>
        <Endpoint/>
      </Route>
      <Route path={match.path}>
      <EndpointSearch/>
      </Route>
    </Switch>
    </>
  );
  
  }
  
  export default App;