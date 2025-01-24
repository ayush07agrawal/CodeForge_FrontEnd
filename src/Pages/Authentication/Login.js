import classes from "./Login.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, json } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { userExists } from "../../redux/reducers/auth";
import { server } from "../../Assests/config";
import { useRef, useState } from "react";


export default function LoginPopUp({loginVisible,showLoginPage,closeLoginPage,showSignUpPage}){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = useRef();
    const password = useRef();
    const [error, setError] = useState();

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
            if (!response.ok) {
                throw json(
                    { message: "Error while loading the data..." },
                    { status: 500 }
                );
            }
            else {
                const resData = await response.json();
                console.log(resData);
                if (resData.success) {
                    toast.success(resData.message);
                    dispatch(userExists(resData.user));
                    navigate("/app");
                }
                else {
                    setError(resData.message);
                }
            }
        } 
        catch (error) {
            toast.error(error.message);
            console.error("Error submitting code:", error);
            navigate("/");
        }
    }
    return(
        <div className={`${classes.popUp} ${loginVisible ? classes.showPopUp : ""}`}>
            <button 
                className={classes.popUpSideHeading} 
                onClick={(e)=>{
                    e.stopPropagation()
                    showLoginPage()
                }}
            >
                <div className={classes.sideHeadingText}>Login</div>
            </button>
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
                <div className={classes.signupPopupContent}>
                    <div style={{display:'flex', gap:'2px'}}>
                        <input type="checkbox"></input>
                        <p>Remember Me</p>
                    </div>
                    <p className={classes.invisibleButton}>Forgot Password?</p>
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
    );
}