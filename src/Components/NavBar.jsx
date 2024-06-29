import React from 'react';
import classes from "./NavBar.module.css";
import { NavLink } from 'react-router-dom';
import img1 from "../Assests/Frame1.jpg";
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../redux/reducers/auth';
import axios from 'axios';
import { server } from '../Assests/config';
import toast from 'react-hot-toast';

export default function NavBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
        const { data } = await axios.get(`${server}/api/v1/user/logOut`, { withCredentials: true });
        dispatch(userNotExists());
        toast.success(data.message);
    }
    catch(error) {
        toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

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
            <button className = {classes.btn} onClick={handleLogOut}>
              LogOut
            </button>
          </li>
        </ul>    
    </div>
  )
}
