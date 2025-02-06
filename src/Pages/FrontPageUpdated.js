import React, { useState } from "react";
import { useDispatch } from "react-redux";
import classes from "./FrontPageUpdated.module.css";

import logo from "../Assests/Frame1.jpg";
import frontImage from "../Assests/FrontPhoto.png";
import practice from "../Assests/practice.png"
import labImage from "../Assests/Icons/lab.png"
import SignUpPopUp from "./Authentication/SignUp";
import LoginPopUp from "./Authentication/Login";
import { setFormState } from "../redux/reducers/misc";

function FrontPageUpdated() {
	const [loginVisible, setLoginVisible] = useState(false);
	const [signUpPageVisible, setSignUpPageVisible] = useState(false);
	const [signVisible, setSignVisible] = useState(0);
	const [passwordChange, setPasswordChange] = useState(false);
    const [passwordPageScroll, setPasswordPageScroll] = useState(0);
	const dispatch = useDispatch();

	const showLoginPage = () => {
		closeSignUpPage();
		setLoginVisible((prev) => true);
	};
	const closeLoginPage = () => {
		closePasswordChangeFunc();
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

	function showPasswordChangeFunc(){
        setPasswordChange((prev)=>true);
    }
    function closePasswordChangeFunc(){
        closePasswordPageFunction();
        setPasswordChange((prev)=>false);
    }

    const nextPasswordPageFunction = () => {
        setPasswordPageScroll((prev) => prev + 1);
    };
    const closePasswordPageFunction = () => {
        setTimeout(() => {
            setPasswordPageScroll((prev) => 0);
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
			<div className={classes.features}>
				<h1>FEATURES</h1>
				<SlidingCards>
					<DisplayCard
						cardImage={practice}
						heading="Generate lab reports in one click"
						isChildren="NO"
					/>
					<DisplayCard
						cardImage={practice}
						heading="practice questions curated by faculty"
						isChildren="NO"
					/>
					<DisplayCard
						cardImage={labImage}
						heading="schedule live labs"
						isChildren="NO"
					/>
					<DisplayCard
						cardImage={practice}
						heading="Seamless and accurate result evaluations"
						isChildren="NO"
					/>
				</SlidingCards>
			</div>

			<hr></hr>

			{/* //benefits */}
			<div className={classes.features}>
				<h1>BENEFITS</h1>
				<SlidingCards style={{'--direction':"reverse"}}>
					<DisplayCard
						cardImage={practice}
						heading="Digital Efficiency"
					>Say goodbye to manual effort and paperwork</DisplayCard>
					<DisplayCard
						cardImage={practice}
						heading="Customizable Reports"
					>Tailored insights to match institutional needs</DisplayCard>
					<DisplayCard
						cardImage={practice}
						heading="Enhanced Learning"
					>Interactive labs for better comprehension and retention</DisplayCard>
				</SlidingCards>
			</div>


			<LoginPopUp
				loginVisible={loginVisible}
				showLoginPage={showLoginPage}
				showSignUpPage={showSignUpPage}

				passwordChange={passwordChange}
				passwordPageScroll={passwordPageScroll}
				showPasswordChangeFunc={showPasswordChangeFunc}
				closePasswordChangeFunc={closePasswordChangeFunc}
				nextPasswordPageFunction={nextPasswordPageFunction}
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

function DisplayCard({cardImage,heading,children,isChildren="YES"}){
	return(
		<li>			
			<div className={classes.cardPhoto}>
				<div>
					<img src={cardImage} alt=""></img>
				</div>
			</div>
			<div className={classes.cardText}>
				<div className={classes.cardHeading}>{heading}</div>
				{isChildren==="YES" && <div className={classes.cardPara}>{children}</div>}
			</div>
		</li>
	);
}

function SlidingCards({children, ...props}){
	return(
		<ul className={classes.sliding} {...props}>
			{children}
			{children}
			{children}
			{children}
		</ul>
	);
}

export default FrontPageUpdated;