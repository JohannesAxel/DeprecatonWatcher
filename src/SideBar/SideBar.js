
import { ControlCameraOutlined } from '@material-ui/icons';
import './SideBar.scss';
import SideBarItem from './SideBarItem/SideBarItem';
function SideBar(props) {

  console.log("hallloooo")
  console.log(props.pages)
  var sideBarItems = props.pages.map((item, index) => {return <SideBarItem 
    id={index} 
    name={item.name}
    path={item.path}
    onClick={props.onSideBarClick ? props.onSideBarClick.bind(this,item.name) : null}>
    </SideBarItem>})
console.log(sideBarItems)
  return (
        <div className="side-bar">
          {sideBarItems}
        </div>
  );

  
}

export default SideBar;