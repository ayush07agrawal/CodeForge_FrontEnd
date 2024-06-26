import React from 'react';
import classes from "./NavBar.module.css";
import { NavLink } from 'react-router-dom';
import img1 from "../Assests/Frame1.jpg";

export default function NavBar() {
  return (
    <div className={classes.wrapper}>
        <NavLink to="/" className={classes.brand}><img src={img1} alt="Logo" /></NavLink>
        <ul className={classes.links}>
          <li><NavLink to="/" className={({isActive}) => (isActive ? classes.active : undefined)}>Practice</NavLink></li>
          <li><NavLink to="lab" className={({isActive}) => (isActive ? classes.active : undefined)}>Lab</NavLink></li>
          <li>
            {/* <NavLink to="/:userid" className={({isActive}) => (isActive ? classes.active : undefined)}>
              <img src="" alt="Profile" />
            </NavLink> */}
            <NavLink to="/auth/verifyEmail">
              Sign Up / Login
            </NavLink>
          </li>
        </ul>    
    </div>
  )
}