import classes from "./SignUp.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { userExists } from "../../redux/reducers/auth";
import { server } from "../../Assests/config";
import { useRef, useState } from "react";
import OtpInput from "react-otp-input";
import { setEmail, setRole, setFormState } from "../../redux/reducers/misc";

// mail verify -> nextPageFunction

export default function SignUpPopUp({ signUpPageVisible, showSignUpPage, signVisible, nextPageFunction, showLoginPage }){
	const mailForm = useRef();
	const [otpForm, setOtpForm] = useState("");
	const nameForm = useRef();
	const passwordForm = useRef();
	const crfmPasswordForm = useRef();
	const secretQueForm = useRef();
	const secretAnsForm = useRef();

	// const [currForm, setCurrForm] = useState(0); // 0 - mailVerify, 1-OTPVerify, 2-SignUp
	const navigate = useNavigate();
	const email_redux = useSelector((state) => state.misc.email);
	const formState = useSelector((state) => state.misc.formState);
	const dispatch = useDispatch();

	async function handleSubmit(event) {
		event.preventDefault();
		let data = undefined;
		if(formState === 0){
			data = {
				email : mailForm.current.value
			}
		}
		else if(formState === 1){
			data = {
				email : email_redux,
				otp : otpForm
			}
		}
		else if(formState === 2){
			data = {
                email : email_redux,
				name : nameForm.current.value,
                password : passwordForm.current.value,
                confirmPassword : crfmPasswordForm.current.value,
                secretQuestion : secretQueForm.current.value,
                secretAnswer : secretAnsForm.current.value
			}
		}
		else{
			toast.error("No valid form type to submit!");
			navigate("/");
		}
		// console.log(data);
		try {
			console.log(data);
			const response = await fetch(`${server}/api/v1/user/${formState === 0 ? 'verifyEmail' : (formState === 1 ? 'verifyOTP' : 'new')}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				credentials: "include",
			});

			const resData = await response.json();
			console.log("formState: ", formState);


			if (!response.ok) {
                throw new Error(resData.message || "Error while loading the data...");
            }
				
			console.log(resData);
			if (resData.success) {
				if(formState === 0) {
					// if (resetPassword) dispatch(setSecretQuestion(resData.secretQuestion));
					dispatch(setEmail(data.email));
					dispatch(setRole(resData.role));
					toast.success(resData.message);
					dispatch(setFormState(1));
					nextPageFunction();
					return;
				}
				if (formState === 1) {
					toast.success(resData.message);
					// if (resetPassword) return navigate("/auth/setPassword");
					dispatch(setFormState(2));
					nextPageFunction();
					return;
				}
				if(formState === 2) {
					dispatch(userExists(resData.user));
					toast.success("Account Created!");
					dispatch(setFormState(0));
					return navigate("/app");
				}
			} else {
				// If `resData.success` is false, set an error message
				toast.error(resData.message);
			}
		}		
		catch (error) {
			console.error("Error during login:", error);
            toast.error(error.message || "An unexpected error occurred");
            navigate("/");
		}
	}

	return (
		<div className={`${classes.popUp} ${classes.secondPopup} ${signUpPageVisible ? classes.showPopUp : ""}`}>
			<button
				className={`${classes.popUpSideHeading} ${classes.secondPopUpSideHeading}`}
				onClick={(e) => {
					e.stopPropagation();
					showSignUpPage();
				}}
			>
				<div className={classes.sideHeadingText}>Sign Up</div>
			</button>
			<div className={classes.secondPopUpWrapper}>
				<div
					className={`${classes.popUpMainSecond} 
                            ${signVisible === 1 ? classes.popUpMainSecondPage1 : ""} 
                            ${signVisible === 2 ? classes.popUpMainSecondPage2 : ""}`}
				>
					<div className={classes.secondPopUpPage1} onClick={(e) => e.stopPropagation()}>
						<div className={classes.popupHeading}>
							<h3>Mail Verification</h3>
						</div>
						<div className={`${classes.popUpInputDiv} ${classes.secondPopUpInputDiv}`}>
						<input className={classes.popupInput} ref={mailForm}></input>
							<FontAwesomeIcon icon={faEnvelope} />
						</div>
						<div className={classes.popUpButtonPlus}>
							<button
								className={`${classes.popUpButton} ${classes.secondPopUpButton}`}
								onClick={handleSubmit}
							>
								Verify
							</button>
							<p>
								Already have an Account?
								<span> </span>
								<span className={classes.invisibleButton1} onClick={showLoginPage}>
									Login
								</span>
							</p>
						</div>
					</div>
					<div className={classes.secondPopUpPage1} onClick={(e) => e.stopPropagation()}>
						<div className={classes.popupHeading}>
							<h3>OTP Verification</h3>
						</div>
						<OtpInput
							id="otp"
							value={otpForm}
							onChange={setOtpForm}
							numInputs={6}
							renderSeparator={<span>-</span>}
							renderInput={(props) => (
								<input {...props} className={classes.otpBox} style={{ width: "35px" }} />
							)}
						/>
						<div className={classes.popUpButtonPlus}>
							<button
								className={`${classes.popUpButton} ${classes.secondPopUpButton}`}
								onClick={handleSubmit}
							>
								Verify
							</button>
							<p>
								Already have an Account?
								<span> </span>
								<span className={classes.invisibleButton1} onClick={showLoginPage}>
									Login
								</span>
							</p>
						</div>
					</div>
					<div className={classes.secondPopUpPage1} onClick={(e) => e.stopPropagation()}>
						<div className={classes.secondPopUpSignUpForm}>
							<div className={classes.popupHeading}>
								<h4>NEW JOINEE</h4>
							</div>
							<div className={classes.signUpForm}>
								<div className={`${classes.popUpInputBlock} ${classes.popUpInputBLockSignUp}`}>
									<label htmlFor="name">Name* :</label>
									<div className={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
										<input className={classes.popupInput} id="name" ref={nameForm}></input>
										<FontAwesomeIcon icon={faUser} />
									</div>
									<label htmlFor="email">Email ID* :</label>
									<div className={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
										<input className={classes.popupInput} id="email"></input>
										<FontAwesomeIcon icon={faEnvelope} />
									</div>
								</div>
								<div className={`${classes.popUpInputBlock} ${classes.popUpInputBLockSignUp}`}>
									<label htmlFor="password">Password* :</label>
									<div className={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
										<input className={classes.popupInput} id="password" ref={passwordForm}></input>
										<FontAwesomeIcon icon={faKey} />
									</div>
									<label htmlFor="confirmPassword">Confirm Password* :</label>
									<div className={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
										<input className={classes.popupInput} id="confirmPassword" ref={crfmPasswordForm}></input>
										<FontAwesomeIcon icon={faKey} />
									</div>
								</div>
							</div>
							<div className={`${classes.popUpInputBlock} ${classes.popUpInputBLockSignUp}`}>
								<label htmlFor="secretQuestion">Secret Question* :</label>
								<div className={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
									<input className={classes.popupInput} id="secretQuestion" ref={secretQueForm}></input>
									<FontAwesomeIcon icon={faUser} />
								</div>
								<label htmlFor="secretAnswer">Secret Answer* :</label>
								<div className={`${classes.popUpInputDiv} ${classes.signUpPopUpInputDiv}`}>
									<input className={classes.popupInput} id="secretAnswer" ref={secretAnsForm}></input>
									<FontAwesomeIcon icon={faLock} />
								</div>
							</div>
							<div className={classes.popUpButtonPlus}>
								<button
									className={`${classes.popUpButton} ${classes.secondPopUpButton}`}
									onClick={handleSubmit}
								>
									Sign Up
								</button>
								<p>
									Already have an Account?
									<span> </span>
									<span className={classes.invisibleButton1} onClick={showLoginPage}>
										Login
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
