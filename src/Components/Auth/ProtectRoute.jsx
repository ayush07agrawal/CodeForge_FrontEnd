import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const ProtectRoute = ({ children, user, redirect = "/" }) => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    // const { url } = useSelector((state) => state.misc);

    // useEffect(() => {
    //     if(url) navigate(url);
    // }, [dispatch, user, navigate, url]);
    
    if(!user) return <Navigate to = {redirect} />;
    return children ? children : <Outlet/>;
}

export default ProtectRoute;
