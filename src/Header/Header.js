import Grid from '@material-ui/core/Grid';
import SideBarItem from './HeaderItem/HeaderItem';

function Header(props) {
  var sideBarItems = props.pages.map((item, index) => {return <Grid item justify="center"xs={2}>
  <SideBarItem 
    id={index} 
    name={item.name}
    path={item.path}
    onClick={props.onSideBarClick ? props.onSideBarClick.bind(this,item.name) : null}/>
</Grid>
})
  return (
    <Grid container justify="center">
      <Grid item xs={3}>
        <div className="title unmark-text">
          Endpoint Watcher
        </div>
      </Grid>
      {sideBarItems}
    </Grid>
  );
}

export default Header;