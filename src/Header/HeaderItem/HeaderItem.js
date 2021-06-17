import './HeaderItem.scss';
import {Link, useRouteMatch} from "react-router-dom";
import React, { useState, useEffect } from 'react';


function HeaderItem(props) {
  var match = useRouteMatch();
  useEffect(() => {
    console.log(match.url)
    return () => {
    }
  }, [])

  var className = "current-menu"

  return (
      <div className="header-button title unmark-text " onClick={props.onClick}>
        <Link className={className}to={props.path}>
          {props.name}
      </Link>
        </div>
    
  );
}

export default HeaderItem;