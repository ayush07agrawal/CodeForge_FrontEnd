import React from 'react';
import classes from "./NavBar.module.css";
import { NavLink } from 'react-router-dom';
import img1 from "../Assests/Frame1.jpg";
import pphoto from "../Assests/profilephoto.png";
import { useDispatch, useSelector } from 'react-redux';
import { userNotExists } from '../redux/reducers/auth';
import toast from 'react-hot-toast';

import DropDownBatch from './DropdownBatch';
import { setIsDropDown, setIsPopUp } from '../redux/reducers/misc';
import axios from 'axios';
import { server } from '../Assests/config';
import { useGetMyBatchQuery } from '../redux/api/api';
import { useErrors } from '../hooks/hooks';

export default function NavBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logOut`, { withCredentials: true });
      dispatch(userNotExists());
      toast.success(data.message);
    }
    catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }


  const isDropDownShow = useSelector((state) => state.misc.isDropDown);
  const toggleDropdown = () => {
    dispatch(setIsDropDown(!isDropDownShow));
  };

  const showPopup = () => dispatch(setIsPopUp(true));

  const toggleAndShowPopup = () => {
    toggleDropdown();
    showPopup();
  }

  const batchInfo = useGetMyBatchQuery({ userId: user._id });
  const errors = [{ isError: batchInfo.isError, error: batchInfo.error }];
  useErrors(errors);
  const batches = user?.role === "teacher" ? batchInfo?.data?.batches || [] : [];

  return (
    <div>
      <div className={classes.wrapper}>
        <NavLink to="/" className={classes.brand}><img src={img1} alt="Logo" /></NavLink>
        <ul className={classes.links}>
          {
            user?.role === "student" &&
            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? classes.active : undefined)}>
                PRACTICE
              </NavLink>
            </li>}
          {user?.role === "student" && <li>
            <NavLink to="lab" className={({ isActive }) => (isActive ? classes.active : undefined)}>
              LAB
            </NavLink>
          </li>}
          {
            user?.role === "teacher" &&
            <li onClick={toggleDropdown} style={{ color: "white", cursor: "pointer" }}> BATCH </li>
          }
          <li className={classes.pimage}>
            <NavLink to={`user/${user?._id}`} className={({ isActive }) => (isActive ? classes.active : undefined)}>
              <img src={pphoto} alt="Profile" />
            </NavLink>
          </li>
          <li>
            <button className={classes.btn} onClick={handleLogOut}>
              LogOut
            </button>
          </li>
        </ul>
      </div>

      {
        user?.role === "teacher" && 
        !batchInfo.isLoading && 
        <div className={classes.dropDownList}>
          {
            batches?.length !== 0 && 
            batches.map((batch, index) => (
              isDropDownShow && 
              <DropDownBatch btnkey={index} key={index}>
                {batch}
              </DropDownBatch>
            ))
          }
          {
            isDropDownShow &&
            <DropDownBatch
              btnUpdate={1}
              btnkey={(!batches || batches.length === 0) ? 0 : -1}
              onClick={toggleAndShowPopup}
            >
              UPDATE
            </DropDownBatch>
          }
        </div>
      }
    </div>
  )
}