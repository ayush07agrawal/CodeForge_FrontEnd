import React from 'react';
import classes from "./Question.module.css";
import QuestionNav from './QuestionNav';


export default function Question({details}) {
  return (
    <div>
      <QuestionNav />
      <div className={classes.wrapper}>
        <span className={classes.title}>
          <h1>{details?.title}</h1>
          {details?.status && <h2>Solved</h2> }
        </span>
        <ul className={classes.tags}>
          {details?.tags?.map((topic) => <li key={topic}>{topic}</li>)}
        </ul>
        <p className={classes.desc}>{details?.description}</p>
        <h3>Sample Testcases:</h3>
        <div className={classes.testcases}>
          <div className={classes.test}>
            <p>Input:</p>
            <ul className={classes.values}>
              <li key="0">{details?.testCase?.length}</li>
              {details?.testCase?.map((test, index) => <li key={index+1}><p>{test}</p></li>)}
            </ul>
          </div>
          <div className={classes.test}>
            <p>Output:</p>
            <ul className={classes.values}>
              {details?.answer?.map((ans, index) => <li key={index+1}><p>{ans}</p></li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}


