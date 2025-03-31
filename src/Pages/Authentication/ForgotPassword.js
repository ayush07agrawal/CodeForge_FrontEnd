import React, { useRef, useState } from "react";
import classes from "./ForgotPassword.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../Assests/config";
import toast from "react-hot-toast";
import { setEmail, setFormState, setRole, setSecretQuestion } from "../../redux/reducers/misc";

export default function ForgotPasswordComponent({
	passwordPageScroll,
	nextPasswordPageFunction,
	closePasswordChangeFunc,
}) {
	const mailForm = useRef();
	const [otpForm, setOtpForm] = useState("");
	const secretAnsForm = useRef();
	const passwordForm = useRef();
	const crfmPasswordForm = useRef();

	const navigate = useNavigate();
	const email_redux = useSelector((state) => state.misc.email);
	const formState = useSelector((state) => state.misc.formState);
	const secretQuestion = useSelector((state) => state.misc.secretQuestion);
	const dispatch = useDispatch();

	async function handleSubmit(event) {
		event.preventDefault();
		let data = undefined;
		if (formState === 0) {
			data = {
				email: mailForm.current.value,
				resetting: true,
			};
		} else if (formState === 1) {
			data = {
				email: email_redux,
				otp: otpForm,
				resetting: true,
			};
		} else if (formState === 2) {
			data = {
				email: email_redux,
				secretAnswer: secretAnsForm.current.value,
				resetting: true,
			};
		} else if (formState === 3) {
			data = {
				email: email_redux,
				password: passwordForm.current.value,
				confirmPassword: crfmPasswordForm.current.value,
				resetting: true,
			};
		} else {
			toast.error("No valid form type to submit!");
			navigate("/");
		}

		console.log(data);
		try {
			const response = await fetch(
				`${server}/api/v1/user/${
					formState === 0
						? "verifyEmail"
						: formState === 1
						? "verifyOTP"
						: formState === 2
						? "verifyAnswer"
						: "setPassword"
				}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(data),
					credentials: "include",
				}
			);

			const resData = await response.json();
			console.log("formState: ", formState);

			if (!response.ok) {
				throw new Error(resData.message || "Error while loading the data...");
			}

			console.log(resData);
			if (resData.success) {
				if (formState === 0) {
					dispatch(setEmail(data.email));
					dispatch(setRole(resData.role));
					dispatch(setSecretQuestion(resData.secretQuestion));
					dispatch(setFormState(1));
					toast.success(resData.message);
					nextPasswordPageFunction();
					return;
				}
				if (formState === 1) {
					toast.success(resData.message);
					dispatch(setFormState(2));
					nextPasswordPageFunction();
					return;
				}
				if (formState === 2) {
					toast.success(resData.message);
					dispatch(setFormState(3));
					nextPasswordPageFunction();
					return;
				}
				if (formState === 3) {
					dispatch(setEmail(undefined));
					dispatch(setSecretQuestion(undefined));
					toast.success(resData.message);
					dispatch(setFormState(0));
					return navigate("/");
				}
			} else {
				toast.error(resData.message);
				return navigate("/");
			}
		} catch (error) {
			console.error("Error during login:", error);
			toast.error(error.message || "An unexpected error occurred");
			navigate("/");
		}
	}

	return (
		<div className={classes.popUpWrapper}>
			<div
				className={`${classes.popUpMain} 
                            ${passwordPageScroll === 1 ? classes.popUpMainPage1 : ""} 
                            ${passwordPageScroll === 2 ? classes.popUpMainPage2 : ""}
                            ${passwordPageScroll === 3 ? classes.popUpMainPage3 : ""}`}
			>
				<div className={classes.popUpPage} onClick={(e) => e.stopPropagation()}>
					<div className={classes.popUpHeading}>
						<h3>Mail Verification</h3>
					</div>
					<div className={classes.popUpInputDiv}>
						<input
							ref={mailForm}
							className={classes.popUpInput}
							placeholder="Enter your mail id..."
							onKeyDown={(event) => {
								if (event.key === "Tab") {
									event.preventDefault();
								}
							}}
						/>
						<FontAwesomeIcon icon={faEnvelope} />
					</div>
					<div className={classes.popUpButtonPlus}>
						<button className={classes.popUpButton} onClick={handleSubmit}>
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

				<div className={classes.popUpPage} onClick={(e) => e.stopPropagation()}>
					<div className={classes.popUpHeading}>
						<h3>OTP Verification</h3>
					</div>
					<OtpInput
						id="otp"
						value={otpForm}
						onChange={setOtpForm}
						numInputs={6}
						renderSeparator={<span>-</span>}
						renderInput={(props) => (
							<input
								{...props}
								className={classes.otpBox}
								style={{ width: "35px" }}
								onKeyDown={(event) => {
									if (event.key === "Tab") {
										event.preventDefault();
									}
								}}
							/>
						)}
					/>
					<div className={classes.popUpButtonPlus}>
						<button className={classes.popUpButton} onClick={handleSubmit}>
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

				<div className={classes.popUpPage} onClick={(e) => e.stopPropagation()}>
					<div className={classes.popUpHeading}>
						<h3>Profile Verification</h3>
					</div>
					<div className={`${classes.popUpInputBlock} ${classes.popUpInputBLockSecret}`}>
						<label htmlFor="secretAnswerUpdatePassword">
							Secret Question : <p>{" " + secretQuestion}</p>
						</label>
						<div className={classes.popUpInputDiv}>
							<input
								ref={secretAnsForm}
								className={classes.popUpInput}
								onKeyDown={(event) => {
									if (event.key === "Tab") {
										event.preventDefault();
									}
								}}
								id="secretAnswerUpdatePassword"
								placeholder="Enter the answer..."
							/>
							<FontAwesomeIcon icon={faKey} />
						</div>
					</div>

					<div className={classes.popUpButtonPlus}>
						<button className={classes.popUpButton} onClick={handleSubmit}>
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

				<div className={classes.popUpPage} onClick={(e) => e.stopPropagation()}>
					<div className={classes.popUpHeading}>
						<h4>Change Password</h4>
					</div>
					<div className={classes.popUpInputBlock}>
						<label htmlFor="passwordUpdatePassword">Password* :</label>
						<div className={classes.popUpInputDiv}>
							<input
								ref={passwordForm}
								className={classes.popUpInput}
								onKeyDown={(event) => {
									if (event.key === "Tab") {
										event.preventDefault();
									}
								}}
								id="passwordUpdatePassword"
								placeholder="Enter new password..."
							/>
							<FontAwesomeIcon icon={faKey} />
						</div>
					</div>
					<div className={classes.popUpInputBlock}>
						<label htmlFor="confirmPasswordUpdatePassword">Confirm Password* :</label>
						<div className={classes.popUpInputDiv}>
							<input
								ref={crfmPasswordForm}
								className={classes.popUpInput}
								onKeyDown={(event) => {
									if (event.key === "Tab") {
										event.preventDefault();
									}
								}}
								id="confirmPasswordUpdatePassword"
								placeholder="Retype your new password..."
							/>
							<FontAwesomeIcon icon={faKey} />
						</div>
					</div>
					<div className={classes.popUpButtonPlus}>
						<button className={classes.popUpButton} onClick={handleSubmit}>
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
