import React, { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./FrontPageUpdated.module.css";
import logo from "../Assests/Frame1.jpg";
import frontImage from "../Assests/FrontPhoto.png";
import SignUpPopUp from "./Authentication/SignUp";
import LoginPopUp from "./Authentication/Login";
import { setFormState } from "../redux/reducers/misc";

function FrontPageUpdated() {
	const [loginVisible, setLoginVisible] = useState(false);
	const [signUpPageVisible, setSignUpPageVisible] = useState(false);
	const [signVisible, setSignVisible] = useState(0);
	const dispatch = useDispatch();

	const showLoginPage = () => {
		closeSignUpPage();
		setLoginVisible((prev) => true);
	};
	const closeLoginPage = () => {
		setLoginVisible((prev) => false);
		dispatch(setFormState(0));
	};

	const showSignUpPage = () => {
		closeLoginPage();
		setSignUpPageVisible((prev) => true);
	};
	const closeSignUpPage = () => {
		setSignUpPageVisible((prev) => false);
		closePageFunction();
		dispatch(setFormState(0));
	};

	const nextPageFunction = () => {
		setSignVisible((prev) => prev + 1);
	};
	const closePageFunction = () => {
		setTimeout(() => {
			setSignVisible((prev) => 0);
		}, 500);
	};

	return (
		<div
			className={classes.background}
			onClick={(e) => {
				e.stopPropagation();
				closeLoginPage();
				closeSignUpPage();
			}}
		>
			<div className={classes.wrapper1}>
				<div className={classes.wrapper2}>
					<img src={logo} alt="Logo" />
					<div className={classes.typewriter}>Digitizing and Simplifying Labs...</div>
					<div className={classes.buttons}>
						<button
							className={`${classes.btn} ${classes.signup}`}
							onClick={(e) => {
								e.stopPropagation();
								showSignUpPage();
							}}
						>
							Sign Up
						</button>
						<button
							className={`${classes.btn} ${classes.login}`}
							onClick={(e) => {
								e.stopPropagation();
								showLoginPage();
							}}
						>
							Login
						</button>
					</div>
				</div>
				<div className={classes.wrapper3}>
					<div className={classes.imgWrapper}>
						<img src={frontImage} className={classes.frontPageImage} alt="Img" />
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

export default FrontPageUpdated;
