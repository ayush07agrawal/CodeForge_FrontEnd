import React from 'react';
import classes from "./QuestionNav.module.css"
import { useLocation, useNavigate } from 'react-router-dom';

function QuestionNav({ content, handleChange }) {
  const location = useLocation();
  const isLab = location.state?.labId !== undefined;
  const navigate = useNavigate();
  const handleReturn = () => {
    console.log(isLab);
    isLab ? navigate('/app') : navigate('..');
  }

  return (
    <div className={classes.wrapper}>
      <h3 onClick={handleReturn} className={classes.headings}>&lt;Back</h3>
      <h3 onClick={() => handleChange("Question")} className={classes.headings}>
        {content === "Question" ? <u>Description</u> : "Description"}
      </h3>
      <h3 onClick={() => handleChange("Hints")} className={classes.headings}>
        {content === "Hints" ? <u>Hints</u> : "Hints"}
      </h3>
      <h3 onClick={() => handleChange("Submissions")} className={classes.headings}>
        {content === "Submissions" ? <u>Submissions</u> : "Submissions"}
      </h3>
    </div>
  )
}

export default QuestionNav