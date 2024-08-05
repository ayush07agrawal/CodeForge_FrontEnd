import React from "react";
import classes from "./FrontPage.module.css";
import image from "../Assests/Frame1.jpg";
import {Link} from "react-router-dom";

function FrontPage() {
  return (
    <div className={classes.wrapper}>
        <div className={classes.heading}>
          <img className={classes.img} src={image} alt="Logo" />
          <p className={classes.desc}>
            Unleash the full potential of your CS lab! Empower students to hone their skills through a vast bank of past year questions, allowing them to practice, test, and track their progress.  Instructors can elevate teaching by crafting engaging curricula with a user-friendly platform that streamlines question bank management, online lab execution, and real-time student progress monitoring - all in one place.
          </p>
          <Link to="auth/login">
            <button className={classes.btn}>Get Started</button>
          </Link>
        </div>
    </div>
  );
}

export default FrontPage;