import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from "../Components/NavBar";

import BatchAddPopup from '../Components/popup';
import { useDispatch, useSelector } from 'react-redux';
import { setIsDropDown, setIsPopUp } from '../redux/reducers/misc';

export default function Rootpage() {
  const dispatch = useDispatch();
  const dropDownShow = useSelector((state) => state.misc.isDropDown);
  const popUpShow = useSelector((state) => state.misc.isPopUp);
  
  const handleClick = () => {
    if(dropDownShow) dispatch(setIsDropDown(false));
    if(popUpShow) dispatch(setIsPopUp(false));
  }

  return (
    <div stlye={{ backgroundColor : "black" }} onClick = {handleClick}>
      <NavBar />      
      <div style={{"paddingTop":"10vh"}}>
        <Outlet />   
        {popUpShow && 
          <BatchAddPopup show = {popUpShow}>
          </BatchAddPopup> 
        }  
      </div>
    </div>
  );
}