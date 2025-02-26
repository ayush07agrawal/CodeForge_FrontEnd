import React from 'react'
import classes from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className = {classes.errorContainer}>
      <h1 className = {classes.errorCode}>404</h1>
      <h2 className = {classes.errorMessage}>Oops! Page not found.</h2>
      <p className = {classes.errorDescription}>
        The page you are looking for doesn't exist or an error occurred.
      </p>
      <Link to = "/app" className = {classes.errorButton}>Go Home</Link>
    </div>
  );
}