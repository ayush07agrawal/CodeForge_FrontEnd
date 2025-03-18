import React from 'react';
import classes from "./QuestionNav.module.css"
import { useLocation, useNavigate } from 'react-router-dom';

function QuestionNav({content, handleChange}) {
  const location = useLocation();
  const isLab = location.state?.labId !== undefined;
  const navigate = useNavigate();
  const handleReturn = () => {
    console.log(isLab);
    isLab ? navigate('/app'): navigate('..');
  }

  return (
    <div className={classes.wrapper}>
      <p onClick={handleReturn} className={classes.headings}>&lt;Back</p>
      <p onClick={() => handleChange("Question")} className={classes.headings}>
        {content === "Question" ? <b>Description</b> : "Description"}
      </p>
      <p onClick={() => handleChange("Hints")} className={classes.headings}>
        {content === "Hints" ? <b>Hints</b> : "Hints"}
      </p>
      <p onClick={() => handleChange("Submissions")} className={classes.headings}>
        {content === "Submissions" ? <b>Submissions</b> : "Submissions"}
      </p>
    </div>
  )
}

export default QuestionNav