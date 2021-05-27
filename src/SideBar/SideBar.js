
import { ControlCameraOutlined } from '@material-ui/icons';
import './SideBar.scss';
import SideBarItem from './SideBarItem/SideBarItem';
import {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";



function SideBar(props) {


  const location = useLocation();

  const [url, setUrl] = useState()

  useEffect(() => {
    return () => {
      
    }
  }, [])

  var sideBarItems = props.pages.map((item, index) => {return <SideBarItem 
    id={index} 
    name={item.name}
    path={item.path}
    onClick={props.onSideBarClick ? props.onSideBarClick.bind(this,item.name) : null}>
    </SideBarItem>})
  return (
        <div className="side-bar">
          {sideBarItems}
        </div>
  );

  
}

export default SideBar;