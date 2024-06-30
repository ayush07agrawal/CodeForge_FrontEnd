import React, { useEffect, useState } from 'react';
import classes from "./Question.module.css";
import QuestionNav from './QuestionNav';
import DropdownHint from './DropdownHint';
import DropdownSubmission from './DropdownSubmission';
import { server } from '../Assests/config';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function Question({ details }) {
  const params = useParams();
  const [content, setContent] = useState("Question");
  const [submissions, setSubmissions] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const questionId = params.questionId;

  const handleChange = (value) => {
    setContent(value);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const questionName = `${questionId}+${user._id}`;
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`${server}/api/v1/submission/getThisSubmission/${questionName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error('Error fetching submissions');
        }

        const data = await response.json();
        setSubmissions(data.submission);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching submissions:', error);
        }
      }
    };

    fetchSubmissions();
    return () => {
      abortController.abort();
    };
  }, [questionId, user._id]); 

  return (
    <div>
      <QuestionNav content={content} handleChange={handleChange} />
      {(content === "Question") &&
        <div className={classes.wrapper}>
          <span className={classes.title}>
            <h1><u>{details?.title}</u></h1>
            {details?.status && <h2>Solved</h2>}
          </span>
          <ul className={classes.tags}>
            {details?.tags?.map((topic) => <li key={topic}>{topic}</li>)}
          </ul>
          <p className={classes.desc}>
            {details?.description} 
            <br /><br /> 
            <i><strong>[Note] - The first input must always be the number of testcases...</strong></i>
            <br /><br />
          </p>
          <h3>Sample Testcases:</h3>
          <div className={classes.testcases}>
            <div className={classes.test}>
              <p><u>INPUT</u></p>
              <ul className={classes.values}>
                <li key="0">{details?.testCase?.length}</li>
                {details?.testCase?.map((test, index) => <li key={index + 1}><p>{test}</p></li>)}
              </ul>
            </div>
            <div className={classes.test}>
              <p><u>OUTPUT</u></p>
              <ul className={classes.values}>
                {details?.answer?.map((ans, index) => <li key={index + 1}><p>{ans}</p></li>)}
              </ul>
            </div>
          </div>
        </div>
      }
      {(content === "Hints") &&
        <div className={classes.wrapper}>
          {details.hints.map((item, idx) => <DropdownHint number={idx+1} data={item}/>)}
        </div>
      }
      {(content === "Submissions") &&
        <div className={classes.wrapper}>
          {
          (submissions.length !== 0)
          ? 
          submissions.map((item, idx) => <DropdownSubmission details={item} number={submissions.length-idx} key = {uuid()}/>) 
          : 
          <h3 className={classes.desc}>
            <strong><i>No Submissions Found</i></strong>
          </h3>
          }
        </div>
      }
    </div>
  )
}