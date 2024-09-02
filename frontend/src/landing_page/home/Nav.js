import React from 'react';
import './Nav.css'
import { Link } from 'react-router-dom';
function Nav() {
    return (  
        <>
        <div className="top-sec border-bottom">
  <Link class="nav-link " to="/home" >Stats</Link>
  <Link class="nav-link" to="/details">Detailed Info</Link>


</div>
        </>
    );

}
export default Nav;