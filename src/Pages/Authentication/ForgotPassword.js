import React, { useState } from "react";
import classes from "./ForgotPassword.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import OtpInput from "react-otp-input";

export default function ForgotPasswordComponent({ passwordPageScroll, nextPasswordPageFunction, closePasswordChangeFunc }){

    return(
            <div className={classes.PopUpWrapper}>
				<div
					className={`${classes.popUpMain} 
                            ${passwordPageScroll === 1 ? classes.popUpMainPage1 : ""} 
                            ${passwordPageScroll === 2 ? classes.popUpMainPage2 : ""}
                            ${passwordPageScroll === 3 ? classes.popUpMainPage3 : ""}`}
				>
					<div className={classes.PopUpPage} onClick={(e) => e.stopPropagation()}>
						<div className={classes.popupHeading}>
							<h3>Mail Verification</h3>
						</div>
						<div className={classes.popUpInputDiv}>
						    <input className={classes.popupInput}></input>
							<FontAwesomeIcon icon={faEnvelope} />
						</div>
						<div className={classes.popUpButtonPlus}>
							<button
								className={classes.popUpButton}
								onClick={nextPasswordPageFunction}
							>
								Verify
							</button>
                            <p>
                                Want to go back to Login Page? 
                                <span> </span>
                                <span className={classes.invisibleButton} onClick={closePasswordChangeFunc}>
                                    Login
                                </span>
                            </p>
						</div>
					</div>

                    <div className={classes.PopUpPage} onClick={(e) => e.stopPropagation()}>
						<div className={classes.popupHeading}>
							<h3>OTP Verification</h3>
						</div>
						<OtpInput
							id="otp"
							numInputs={6}
							renderSeparator={<span>-</span>}
							renderInput={(props) => (
								<input {...props} className={classes.otpBox} style={{ width: "35px" }} />
							)}
						/>
						<div className={classes.popUpButtonPlus}>
							<button
								className={classes.popUpButton}
								onClick={nextPasswordPageFunction}
							>
								Verify
							</button>
							<p>
                                Want to go back to Login Page? 
                                <span> </span>
                                <span className={classes.invisibleButton} onClick={closePasswordChangeFunc}>
                                    Login
                                </span>
                            </p>
						</div>
					</div>

					<div className={classes.PopUpPage} onClick={(e) => e.stopPropagation()}>
						<div className={classes.popupHeading}>
							<h3>Profile Verification</h3>
						</div>
                        <div className={`${classes.popUpInputBlock} ${classes.popUpInputBLockSecret}`}>
                            <label htmlFor="secretAnswer">Secret Question :</label>
                            <div className={classes.popUpInputDiv}>
                                <input className={classes.popupInput} id="secretAnswer"></input>
                                <FontAwesomeIcon icon={faKey} />
                            </div>
                        </div>
						
						<div className={classes.popUpButtonPlus}>
							<button
								className={classes.popUpButton}
								onClick={nextPasswordPageFunction}
							>
								Verify
							</button>
                            <p>
                                Want to go back to Login Page?
                                <span> </span>
                                <span className={classes.invisibleButton} onClick={closePasswordChangeFunc}>
                                    Login
                                </span>
                            </p>
						</div>
					</div>
                    
					<div className={classes.PopUpPage} onClick={(e) => e.stopPropagation()}>						
						<div className={classes.popupHeading}>
							<h4>Change Password</h4>
						</div>
						<div className={classes.popUpInputBlock}>
							<label htmlFor="password">Password* :</label>
							<div className={classes.popUpInputDiv}>
								<input className={classes.popupInput} id="password"></input>
								<FontAwesomeIcon icon={faKey} />
							</div>							
						</div>
                        <div className={classes.popUpInputBlock}>
							<label htmlFor="confirmPassword">Confirm Password* :</label>
							<div className={classes.popUpInputDiv}>
								<input className={classes.popupInput} id="confirmPassword"></input>
								<FontAwesomeIcon icon={faKey} />
							</div>							
						</div>
						<div className={classes.popUpButtonPlus}>
							<button
								className={classes.popUpButton}
							>
								Change Password
							</button>
                            <p>
                                Want to go back to Login Page?
                                <span> </span>
                                <span className={classes.invisibleButton} onClick={closePasswordChangeFunc}>
                                    Login 
                                </span>
                            </p>
						</div>
					</div>
				</div>
			</div>
        
    );
}