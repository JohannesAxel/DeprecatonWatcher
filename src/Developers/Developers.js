import DeveloperSearch from "./DeveloperSearch/DeveloperSearch"
import Developer from "./Developer/Developer"

import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
function App(props) {
  let match = useRouteMatch();

  return (
    <>
    <Switch>
        <Route path={`${match.path}/:id`}>
          <Developer/>
        </Route>
        <Route path={match.path}>
        <DeveloperSearch/>
        </Route>
      </Switch>
    
    </>
  );
  
  }
  
  export default App;