import classes from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, json } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { userExists } from "../../redux/reducers/auth";
import { server } from "../../Assests/config";
import { useRef, useState } from "react";

import ForgotPasswordComponent from "./ForgotPassword";


export default function LoginPopUp({
    loginVisible,
    showLoginPage,
    showSignUpPage,

    passwordChange,
	passwordPageScroll,
	showPasswordChangeFunc,
	closePasswordChangeFunc,
	nextPasswordPageFunction,
}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef();
    const [rememberMe, setRememberMe] = useState("");


    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            email: email.current.value,
            password: password.current.value
        };

        console.log(data);

        try {
            const response = await fetch(`${server}/api/v1/user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            // Parse response JSON
            const resData = await response.json();

            // If the response is not OK, set the error message and throw an error
            if (!response.ok) {
                throw new Error(resData.message || "Error while loading the data...");
            }

            // If the response is successful and `resData.success` is true
            if (resData.success) {
                toast.success(resData.message);
                dispatch(userExists(resData.user));
                navigate("/app");
            } else {
                // If `resData.success` is false, set an error message
                toast.error(resData.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error(error.message || "An unexpected error occurred");
            navigate("/");
        }
    }

    return(
        <div className={`${classes.popUp} ${loginVisible ? classes.showPopUp : ""} ${passwordChange && classes.showPopUpPasswordChange}`}>
            <button 
                className={`${classes.popUpSideHeading} ${passwordChange && classes.popUpSideHeadingPasswordChange}`} 
                onClick={(e)=>{
                    e.stopPropagation()
                    showLoginPage()
                }}
            >
                <div className={classes.sideHeadingText}>
                    {passwordChange?`Change Password`:`Login`}
                </div>
            </button>
            <div className={`${classes.popUpWrapper} ${passwordChange && classes.showPasswordpopUpWrapper}`}>
                <div className = {`${classes.mainWrapper} ${passwordChange && classes.showPasswordMainWrapper}`}>
                    <div className={classes.loginPage}>
                        <div 
                            className={classes.popUpMain}
                            onClick={
                                (e)=>e.stopPropagation()
                            }
                        >
                            <div className={classes.popupHeading}>
                                <h2>Login</h2>
                            </div>
                            <div className={classes.popUpInputBlock}>
                                <div className={classes.popUpInputDiv}>
                                    <input className={classes.popupInput} ref={email} placeholder="Enter email..."></input>
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div className={classes.popUpInputDiv}>
                                    <input type="password" className={classes.popupInput} ref={password} placeholder="Enter password..."></input>
                                    <FontAwesomeIcon icon={faKey} />
                                </div>
                            </div>
                            <div className={classes.loginPopupContent}>
                                <div style={{display:'flex', gap:'2px'}}>
                                    <input type="checkbox"></input>
                                    <p>Remember Me</p>
                                </div>
                                <p 
                                    className={classes.invisibleButton}
                                    onClick = {showPasswordChangeFunc}
                                >
                                    Forgot Password?
                                </p>
                            </div>
                            <div className={classes.popUpButtonPlus}>
                                <button className={classes.popUpButton} onClick={handleSubmit}>Log in</button>
                                <p>
                                    Don't have an account?
                                    <span> </span>  
                                    <span 
                                        className={classes.invisibleButton}
                                        onClick={showSignUpPage}
                                    >
                                            Sign Up
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>                    
                    <div className={classes.passwordChangePage}>
                        <ForgotPasswordComponent 
                            passwordPageScroll={passwordPageScroll}
                            nextPasswordPageFunction={nextPasswordPageFunction}
                            closePasswordChangeFunc={closePasswordChangeFunc}
                        />
                    </div>
                </div>                
            </div>
        </div>
    );
}