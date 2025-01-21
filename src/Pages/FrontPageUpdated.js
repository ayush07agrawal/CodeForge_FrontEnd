import React,{ useState } from "react";
import classes from "./FrontPageUpdated.module.css";
import logo from "../Assests/Frame1.jpg";
import frontImage from "../Assests/FrontPhoto.png";
import OtpInput from "react-otp-input";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faMailReply, faMailBulk, faVoicemail, faMessage, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';



function FrontPageUpdated(){
    const [ loginVisible,setLoginVisible ] = useState(false);
    const [ signUpPageVisible,setSignUpPageVisible] = useState(false);
    const [ signVisible,setSignVisible ] = useState(0);

    const showLoginPage = ()=>{
        closeSignUpPage();
        setLoginVisible((prev)=>true);
    }
    const closeLoginPage = ()=>{
        setLoginVisible((prev)=>false);
    }

    const showSignUpPage = ()=>{
        closeLoginPage();
        setSignUpPageVisible((prev)=>true);
    }
    const closeSignUpPage = ()=>{
        setSignUpPageVisible((prev)=>false);
        closePageFunction();
    }    

    const nextPageFunction = ()=>{
        setSignVisible((prev)=>prev+1);
    }
    const closePageFunction = ()=>{
        setTimeout(() => {
            setSignVisible((prev) => 0);
        }, 500);
    }

    return(
        <div 
            class={classes.background}
            onClick={(e)=>{
                e.stopPropagation()
                closeLoginPage()
                closeSignUpPage()
            }}
        >
            <div class={classes.wrapper1}>
                <div class={classes.wrapper2}>
                    <img src={logo}></img>
                    <div class={classes.typewriter}>
                        Digitizing and Simplifying Labs...
                    </div>
                    <div class={classes.buttons}>
                        <button 
                            class={`${classes.btn} ${classes.signup}`}
                            onClick={(e)=>{
                                e.stopPropagation()
                                showSignUpPage()
                            }}
                        >Sign Up</button>
                        <button 
                            class={`${classes.btn} ${classes.login}`} 
                            onClick={(e)=>{
                                e.stopPropagation()
                                showLoginPage()
                            }}
                        >Login</button>
                    </div>
                </div>
                <div class = {classes.wrapper3}>
                    <div class={classes.imgWrapper}>
                        <img src={frontImage} class={classes.frontPageImage}></img>
                    </div>
                </div>
            </div>
            <hr></hr>

            {/* //features */}
            <ul>
                <li>practice questions curated by faculty</li>
                <li>schedule live labs</li>
                <li>Seamless and accurate result evaluations</li>
                <li>Generate lab reports in one click</li>
            </ul>

            {/* //benefits */}
            <ul>
                <li>Digital Efficiency : Say goodbye to manual effort and paperwork.</li>
                <li>Customizable Reports : Tailored insights to match institutional needs.</li>
                <li>Enhanced Learning : Interactive labs for better comprehension and retention.</li>
                <li></li>
            </ul>
            
            <LoginPopUp 
                loginVisible={loginVisible} 
                showLoginPage={showLoginPage} 
                closeLoginPage={closeLoginPage}
                showSignUpPage={showSignUpPage}
            />   
            <SignUpPopUp 
                signUpPageVisible={signUpPageVisible} 
                showSignUpPage={showSignUpPage}
                signVisible={signVisible}
                nextPageFunction={nextPageFunction}
                showLoginPage={showLoginPage}
            />         
        </div>
    );
}

function LoginPopUp({loginVisible,showLoginPage,closeLoginPage,showSignUpPage}){
    return(
        <div className={`${classes.popUp} ${loginVisible ? classes.showPopUp : ""}`}>
            <button 
                class={classes.popUpSideHeading} 
                onClick={(e)=>{
                    e.stopPropagation()
                    showLoginPage()
                }}
            >
                <div class={classes.sideHeadingText}>Login</div>
            </button>
            <div 
                class={classes.popUpMain}
                onClick={
                    (e)=>e.stopPropagation()
                }
            >
                <div class={classes.popupHeading}>
                    <h2>Login</h2>
                </div>
                <div class={classes.popUpInputBlock}>
                    <div class={classes.popUpInputDiv}>
                        <input class={classes.popupInput}></input>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div class={classes.popUpInputDiv}>
                        <input class={classes.popupInput}></input>
                        <FontAwesomeIcon icon={faKey} />
                    </div>
                </div>
                <div class={classes.signupPopupContent}>
                    <div style={{display:'flex', gap:'2px'}}>
                        <input type="checkbox"></input>
                        <p>Remember Me</p>
                    </div>
                    <p class={classes.invisibleButton}>Forgot Password?</p>
                </div>
                <div class={classes.popUpButtonPlus}>
                    <button class={classes.popUpButton}>Log in</button>
                    <p>
                        Don't have an account?
                        <span> </span>  
                        <span 
                            class={classes.invisibleButton}
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

function SignUpPopUp({ signUpPageVisible,showSignUpPage,signVisible,nextPageFunction,showLoginPage}){
    return(
        <div className={`${classes.popUp} ${classes.secondPopup} ${signUpPageVisible ? classes.showPopUp : ""}`}>
            <button 
                class={`${classes.popUpSideHeading} ${classes.secondPopUpSideHeading}`} 
                onClick={(e)=>{
                    e.stopPropagation()
                    showSignUpPage()
                }}
            >
                <div class={classes.sideHeadingText}>Sign Up</div>
            </button>
            <div class={classes.secondPopUpWrapper}>
                <div 
                    class={`${classes.popUpMainSecond} 
                            ${signVisible==1 ? classes.popUpMainSecondPage1 : ""} 
                            ${signVisible==2 ? classes.popUpMainSecondPage2 : ""}`
                          }
                >
                    <div 
                        class={classes.secondPopUpPage1}
                        onClick={(e)=>e.stopPropagation()}
                    >
                        <div class={classes.popupHeading}>
                            <h3>Mail Verification</h3>
                        </div>
                        <div class={`${classes.popUpInputDiv} ${classes.secondPopUpInputDiv}`}>
                            <input class={classes.popupInput}></input>
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <div class={classes.popUpButtonPlus}>
                            <button 
                                class={`${classes.popUpButton} ${classes.secondPopUpButton}`}
                                onClick={nextPageFunction}
                            >
                                Verify
                            </button>
                            <p>
                                Already have an Account?
                                <span> </span>  
                                <span 
                                    class={classes.invisibleButton1}
                                    onClick={showLoginPage}
                                >
                                        Login
                                </span>
                            </p>
                        </div>                        
                    </div>
                    <div 
                        class={classes.secondPopUpPage1}
                        onClick={(e)=>e.stopPropagation()}
                    >
                        <div class={classes.popupHeading}>
                            <h3>OTP Verification</h3>
                        </div>
                        <OtpInput
                            id="otp"
                            numInputs={6}
                            renderSeparator={<span>-</span>}
                            renderInput={(props) => <input {...props} className={classes.otpBox} style={{width:'35px'}}/>}
                        />                        
                        <div class={classes.popUpButtonPlus}>
                            <button 
                                class={`${classes.popUpButton} ${classes.secondPopUpButton}`}
                                onClick={nextPageFunction}
                            >
                                Verify
                            </button>
                            <p>
                                Already have an Account?
                                <span> </span>  
                                <span 
                                    class={classes.invisibleButton1}
                                    onClick={showLoginPage}
                                >
                                        Login
                                </span>
                            </p>
                        </div>
                    </div>
                    <div 
                        class={classes.secondPopUpPage1}
                        onClick={(e)=>e.stopPropagation()}
                    >
                        <div class={classes.popupHeading}>
                            <h4>NEW JOINEE</h4>
                        </div>
                        <div class={`${classes.popUpInputBlock} ${classes.popUpInputBLockSignUp}`}>
                            <label for='name'>Name* :</label>   
                            <div class={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>                                
                                <input class={classes.popupInput} id="name"></input>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <label for='email'>Email ID* :</label> 
                            <div class={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
                                <input class={classes.popupInput} id="email"></input>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                        </div>
                        <div class={`${classes.popUpInputBlock} ${classes.popUpInputBLockSignUp}`}>
                            <label for='password'>Password* :</label> 
                            <div class={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
                                <input class={classes.popupInput} id="password"></input>
                                <FontAwesomeIcon icon={faKey} />
                            </div>
                            <label for='confirmPassword'>Confirm Password* :</label>
                            <div class={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
                                <input class={classes.popupInput} id="confirmPassword"></input>
                                <FontAwesomeIcon icon={faKey} />
                            </div>
                        </div>
                        <div class={`${classes.popUpInputBlock} ${classes.popUpInputBLockSignUp}`}>
                            <label for='secretQuestion'>Secret Question* :</label>
                            <div class={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
                                <input class={classes.popupInput} id="secretQuestion"></input>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <label for='secretAnswer'>Secret Answer* :</label>
                            <div class={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
                                <input class={classes.popupInput} id="secretAnswer"></input>
                                <FontAwesomeIcon icon={faLock} />
                            </div>
                        </div>
                        <div class={classes.popUpButtonPlus}>
                            <button 
                                class={`${classes.popUpButton} ${classes.secondPopUpButton}`}
                                onClick={nextPageFunction}
                            >
                                Sign Up
                            </button>
                            <p>
                                Already have an Account?
                                <span> </span>  
                                <span 
                                    class={classes.invisibleButton1}
                                    onClick={showLoginPage}
                                >
                                        Login
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FrontPageUpdated;
