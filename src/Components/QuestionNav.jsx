import React from 'react';
import classes from "./QuestionNav.module.css"
import { Link } from 'react-router-dom';

function QuestionNav() {
  return (
    <div className={classes.wrapper}>
      <h3><Link to="..">Back</Link></h3>
      <h3>Description</h3>
      <h3>Hint</h3>
      <h3>Submissions</h3>
    </div>
  )
}

export default QuestionNav
