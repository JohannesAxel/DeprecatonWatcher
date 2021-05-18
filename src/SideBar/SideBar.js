
import './SideBar.scss';
import SideBarItem from './SideBarItem/SideBarItem';
function SideBar() {
  return (
        <div className="side-bar">
          <SideBarItem/> 
          <SideBarItem/> 
          <SideBarItem/> 
        </div>
  );
}

export default SideBar;