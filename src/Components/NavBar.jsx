import React from 'react';
import classes from "./NavBar.module.css";
import { NavLink } from 'react-router-dom';
import img1 from "../Assests/Frame1.jpg";
import { useSelector } from 'react-redux';

export default function NavBar() {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className={classes.wrapper}>
        <NavLink to="/" className={classes.brand}><img src={img1} alt="Logo" /></NavLink>
        <ul className={classes.links}>
          <li>
            <NavLink to="/" className={({isActive}) => (isActive ? classes.active : undefined)}>
              PRACTICE
            </NavLink>
          </li>
          <li>
            <NavLink to="lab" className={({isActive}) => (isActive ? classes.active : undefined)}>
              LAB
            </NavLink>
          </li>
          <li>
            <NavLink to={`user/${user._id}`} className={({isActive}) => (isActive ? classes.active : undefined)}>
              <img src="" alt="Profile" />
            </NavLink>
          </li>
        </ul>    
    </div>
  )
}
