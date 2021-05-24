import './SideBarItem.scss';
import {Link
} from "react-router-dom";
function SideBarItem(props) {
  return (
    <Link to={props.path} className="unmark-text">
      <div className="side-bar-item" onClick={props.onClick}>
        <p className="unmark-text">
          {props.name}
        </p>
      </div>
    </Link>
  );
}

export default SideBarItem;