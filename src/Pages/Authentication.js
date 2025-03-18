import React from "react";
import TextInput from "../Components/Inputs/TextInput";
import classes from "./Authentication.module.css";
import OtpInput from "react-otp-input";
import image from "../Assests/Frame1.jpg";
import { json, useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { server } from "../Assests/config";
import { useDispatch, useSelector } from "react-redux";
import { userExists } from "../redux/reducers/auth";
import { setEmail, setIsResettingPassword, setSecretQuestion, setRole } from "../redux/reducers/misc";
import toast from "react-hot-toast";

export default function Authentication() {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const resetPassword = useSelector((state) => state.misc.isResettingPassword);
	const secretQuestion = useSelector((state) => state.misc.secretQuestion);
	const email = useSelector((state) => state.misc.email);

	let userEmail = undefined;
	const [otp, setOtp] = useState("");
	const [error, setError] = useState(undefined);

	const signUp = params.mode === "new";
	const login = params.mode === "login";
	const mailVerify = params.mode === "verifyEmail";
	const otpVerify = params.mode === "verifyOTP";
	const updatePassword = params.mode === "setPassword";

	async function handleSubmit(event) {
		event.preventDefault();

		const fd = new FormData(event.target);
		let data = Object.fromEntries(fd.entries());

		if (signUp && data.password !== data.confirmPassword) {
			setError("Passwords do not match");
			return;
		}
		if (signUp) data = { ...data };
		if (mailVerify) userEmail = data.email;
		if (otpVerify || signUp || updatePassword) data = { ...data, email: email };
		if (otpVerify) {
			data = { ...data, otp: otp };
		}
		data = { ...data, resetting: resetPassword };
		console.log(data);
		try {
			console.log(params.mode);
			const response = await fetch(`${server}/api/v1/user/` + params.mode, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
				credentials: "include",
			});
			if (!response.ok) {
				throw json({ message: "Error while loading the data..." }, { status: 500 });
			} else {
				const resData = await response.json();
				console.log(resData);
				if (resData.success) {
					if (mailVerify === true) {
						if (resetPassword) dispatch(setSecretQuestion(resData.secretQuestion));
						dispatch(setEmail(userEmail));
						dispatch(setRole(resData.role));
						console.log(secretQuestion);
						toast.success(resData.message);
						return navigate("/auth/verifyOTP");
					}
					if (otpVerify === true) {
						toast.success(resData.message);
						if (resetPassword) return navigate("/auth/setPassword");
						else return navigate("/auth/new");
					}
					if (signUp === true) {
						dispatch(userExists(resData.user));
					}
					if (login === true) {
						toast.success(resData.message);
						dispatch(userExists(resData.user));
						navigate("/app");
					}
					if (updatePassword === true) {
						dispatch(setEmail(undefined));
						dispatch(setSecretQuestion(undefined));
						dispatch(setIsResettingPassword(false));
						toast.success(resData.message);
						navigate("/auth/login");
					}
				}
				else if (resetPassword && !resData.success) {
					toast.error("Mail Not Found...");
					dispatch(setIsResettingPassword(false));
					navigate("/auth/login");
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

	return (
		<>
			<img className={classes.image} src={image} alt="Logo" />
			<div className={classes.wrapper}>
				<form onSubmit={handleSubmit} className={signUp ? classes.form2 : classes.form}>
					<div className={classes.heading}>
						{mailVerify && <h1>Mail Verification 🪪</h1>}
						{otpVerify && <h1>OTP Confirmation 🔐</h1>}
						{updatePassword && <h1>NEW PASSWORD 🔑</h1>}
						{login && <h1>WELCOME BACK😀</h1>}
						{signUp && <h1>WELCOME NEW JOINEE 🧑🏻‍🎓</h1>}
					</div>

					<div className={classes.input}>
						{signUp && (
							<TextInput width="small" name="name" type="text" label="Name" required>
								Enter your Name...
							</TextInput>
						)}

						{mailVerify && (
							<TextInput width="small" name="email" type="email" label="Email" required>
								Enter your mail id...
							</TextInput>
						)}

						{otpVerify && (
							<>
								<div className={classes.otpInput}>
									<label htmlFor="otp">Enter the OTP: </label>
									<OtpInput
										id="otp"
										value={otp}
										onChange={setOtp}
										numInputs={6}
										renderSeparator={<span>..</span>}
										renderInput={(props) => <input {...props} className={classes.otpBox} />}
									/>
								</div>
								{resetPassword && (
									<TextInput name="secretAnswer" type="text" label={secretQuestion} required>
										Enter the answer...
									</TextInput>
								)}
							</>
						)}

						{(login || signUp) && (
							<TextInput name="email" type="email" label="Email" width="small" required>
								Enter your institute email id...
							</TextInput>
						)}

						{(login || signUp || updatePassword) && (
							<TextInput name="password" type="password" label="Password" width="small" required>
								Enter your password...
							</TextInput>
						)}

						{(signUp || updatePassword) && (
							<>
								<TextInput
									name="confirmPassword"
									type="password"
									label="Confirm Password"
									width="small"
									required
								>
									Retype your password...
								</TextInput>
							</>
						)}

						{signUp && (
							<TextInput name="secretQuestion" type="text" label="Secret Question" required>
								Enter a secret question...
							</TextInput>
						)}

						{signUp && (
							<TextInput name="secretAnswer" type="text" label="Secret Answer" required>
								Enter the answer to the secret question..
							</TextInput>
						)}
						<button className={otpVerify || mailVerify ? classes.btn : classes.btn2}>
							{(signUp && "Sign Up") ||
								(login && "Login") ||
								((mailVerify || otpVerify) && "Verify") ||
								(updatePassword && "Update Password")}
						</button>
					</div>
					{(signUp || mailVerify) && (
						<p className={classes.text}>
							Already have an Account ? <Link to="/auth/login">Login</Link>
						</p>
					)}

					{login && (
						<p className={classes.text}>
							Want to create an account ? <Link to="/auth/verifyEmail">SignUp</Link>
						</p>
					)}
					{login && (
						<p className={classes.text}>
							Forgot Password ?{" "}
							<Link to="/auth/verifyEmail" onClick={() => dispatch(setIsResettingPassword(true))}>
								Change Password
							</Link>
						</p>
					)}

					{error && <p>{error}</p>}
				</form>
			</div>
		</>
	);
}
