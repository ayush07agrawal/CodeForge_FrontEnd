import React, { useEffect, useState } from 'react';
import classes from "./Question.module.css";
import QuestionNav from './QuestionNav';
import DropdownHint from './DropdownHint';
import DropdownSubmission from './DropdownSubmission';
import { server } from '../Assests/config';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';


function formatDate(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hrs = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return (hrs + ":" + minutes + " " + day + "/" + month + "/" + year);
}


export default function Question({ details, labId }) {
  const params = useParams();
  const navigate = useNavigate();
  
  const [content, setContent] = useState("Question");
  const [submissions, setSubmissions] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const questionId = params.questionId;

  const handleChange = (value) => {
    setContent(value);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const questionName = `${questionId}${user._id}`;
    const fetchSubmissions = async () => {
      try {
        // console.log(questionName);
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
        // console.log(data);
        setSubmissions(data.submission);
        // console.log(data);
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

            {(user.role === "teacher") && 
              <button onClick={() =>navigate(`/app/questionform/edit`, { state: {question:details, questionId:questionId, labId:labId} })} className={classes.editBtn}>
              Edit Question
            </button>}
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
        {details.hints.length !== 0 ? 
          details.hints.map((item, idx) => <DropdownHint heading={"Hint " + (idx + 1)} key = {uuid()}>{item}</DropdownHint>)
        : <h1>No hints available</h1>}
        </div>
      }
      {(content === "Submissions") &&
        <div className={classes.wrapper}>
          {
            (submissions.length !== 0)
              ?
              submissions.map((item, idx) => <DropdownSubmission heading={"Submission " + (submissions.length - idx)} key={uuid()} date={formatDate(item?.timestamp)}>
                <p><strong>Time taken: </strong> {item.time + " s"}</p>
                <br /><p><strong>Memory used: </strong> {item.space + " kb"}</p>
                <br />
                <pre className={classes.codeArea}>
                  <code>
                    {item.script}
                  </code>
                </pre>
              </DropdownSubmission>)
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