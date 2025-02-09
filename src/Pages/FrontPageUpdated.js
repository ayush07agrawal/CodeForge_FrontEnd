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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

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
			
			
			<div className={classes.contactUs}>
				<h1>ContactUs</h1>
				<ContactUs></ContactUs>
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

function ContactUs(){
	const [isContactUsOpen, setIsContactUsOpen] = useState(0);
	const [contactUsData, setContactUsData] = useState({
		name : "",
		email : "",
		message : "",
	})

	const toggleContactUs = ()=>{
		setIsContactUsOpen((prev)=>!prev)
	}

	const handleContactUsFormChange = (e) =>{
		setContactUsData({...contactUsData, [e.target.name] : e.target.value})
	}

	const handleContactUsFormSubmit = ()=>{}

	return(
		<div className={classes.contactMain}>
			<div className={classes.contactSectionOne}>
				<div className={classes.contactUsHeading}>
					GET IN TOUCH
				</div>	
				<div className={classes.contactUsPara}>
					<p>
						We'd love to hear from you! Whether you have a question, need assistance, or just want to share your feedback, feel free to reach out to us.
					</p>
				</div>
				<div className={classes.contactUsFeature}>
					<div className={classes.contactUsIcon}>
						<FontAwesomeIcon icon={faPhone} />
					</div>
					<div className={classes.contactUsFeatureInfo}>
						<div>CALL US,</div>
						<div>+91 6203985947</div>
					</div>
				</div>
				<div className={classes.contactUsFeature}>
					<div className={classes.contactUsIcon}>
						<FontAwesomeIcon icon={faEnvelopeOpen} />
					</div>
					<div className={classes.contactUsFeatureInfo}>
						<div>MAIL US,</div>
						<div className={classes.contactUsFeatureEmail}>codeforge0745@gmail.com</div>
					</div>
				</div>
				<p className={classes.contactUsConnect}>
					Want to message us?
					<span> </span>  
					<span 
						className={classes.contactUsinvisibleButton}
						onClick={toggleContactUs}
					>
							MESSAGE US
					</span>
				</p>
			</div>
			<div className={`${classes.contactSectionTwo} 
							 ${isContactUsOpen ? classes.animateForward : classes.animateBackward}`}
			>	
				<div className={classes.contactUsHeading}>
					MESSAGE US
				</div>	
				<form onSubmit={handleContactUsFormSubmit} className={classes.contactUsForm}>
					<div className={classes.contactUsInputDiv}>
						<input
							type="text"
							name="name"
							placeholder="Enter your name..."
							value={contactUsData.name}
							onChange={handleContactUsFormChange}
							className={classes.contactUsInput}
							required
						/>
						<FontAwesomeIcon icon={faUser} />
					</div>
					<div className={classes.contactUsInputDiv}>
						<input
							type="email"
							name="email"
							placeholder="Enter a valid email address..."
							value={contactUsData.email}
							onChange={handleContactUsFormChange}
							className={classes.contactUsInput}
							required
						/>
						<FontAwesomeIcon icon={faEnvelope} />
					</div>
					<div className={`${classes.contactUsInputDiv} ${classes.contactUsTextAreaDiv}`}>
						<textarea
							name="message"
							placeholder="Enter your message..."
							value={contactUsData.message}
							onChange={handleContactUsFormChange}
							className={`${classes.contactUsInput} ${classes.contactUsTextArea}`}
							required
						/>
					</div>
					<button type="submit" className={classes.contactUsButton}> 
						SUBMIT 
					</button>
					<p className={classes.contactUsConnect}>
						Want to connect with us?
						<span> </span>  
						<span 
							className={classes.contactUsinvisibleButton}
							onClick={toggleContactUs}
						>
								GET IN TOUCH
						</span>
					</p>
				</form>
			</div>  
					
		</div>
	);
}

export default FrontPageUpdated;