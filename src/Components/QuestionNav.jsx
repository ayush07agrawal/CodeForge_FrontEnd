import React from 'react';
import classes from "./QuestionNav.module.css"

function QuestionNav({ content, handleChange }) {

  const handleReturn = () => {
    window.history.back();
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
