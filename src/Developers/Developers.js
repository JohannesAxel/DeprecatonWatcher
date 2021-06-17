import DeveloperSearch from "./DeveloperSearch/DeveloperSearch"
import Developer from "./Developer/Developer"

import {
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
function Developers(props) {
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
  
  export default Developers;