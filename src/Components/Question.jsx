import React, { useEffect, useState } from 'react';
import classes from "./Question.module.css";
import QuestionNav from './QuestionNav';
import DropdownHint from './DropdownHint';
import DropdownSubmission from './DropdownSubmission';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useGetSubmissionQuery } from '../redux/api/api';
import toast from 'react-hot-toast';


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

  const { data, error, isLoading, isSuccess, isError } = useGetSubmissionQuery({ questionId, userId: user._id });

  useEffect(() => {
    if(isSuccess) {
      setSubmissions(data.submission);
    }
    else if(isError) {
      toast.error("Error fetching submissions");
      console.error('Error fetching submissions:', error);
    }
  }, [isSuccess, isError, data, error])

  console.log(user.role);

  return (
    <>
      <QuestionNav content={content} handleChange={handleChange} />
      {!isError && !isLoading && 
      <div>
        {
          (content === "Question") &&
          <div className={classes.wrapper}>
            <span className={classes.title}>
              <h1>{details?.title}</h1>
              {
                (user.role === "teacher") && 
                <button onClick={() =>navigate(`/app/questionform/edit`, { state: {question:details, questionId:questionId, labId:labId} })} className={classes.editBtn}>
                Edit Question
                </button>
              }
            </span>
            <ul className={classes.tags}>
              {details?.tags?.map((topic) => <li key={topic}>{topic}</li>)}
            </ul>
            <hr className={classes.horizontalLine}/>
            <p className={classes.desc}>
              {details?.description}
              <br /><br />
              <i><strong>[Note] - The first line input must be the number of testcases.</strong></i>
              <br /><br />
            </p>
            <h3 className={classes.sampleTC}>Sample Testcases:</h3>
            <div className={classes.testcases}>
              <div className={`${classes.test} ${classes.input}`}>
                <p><u>INPUT</u></p>
                <ul className={classes.values}>
                  <li key="0">{details?.testCase?.length}</li>
                  {details?.testCase?.map((test, index) => <li key={index + 1}><p>{test}</p></li>)}
                </ul>
              </div>
              <div className={`${classes.test} ${classes.output}`}>
                <p><u>OUTPUT</u></p>
                <ul className={classes.values}>
                  {details?.answer?.map((ans, index) => <li key={index + 1}><p>{ans}</p></li>)}
                </ul>
              </div>
            </div>
          </div>
        }
        {
          (content === "Hints") &&
          <div className={classes.wrapper}>
            {
              details.hints.length !== 0 ? 
              details.hints.map((item, idx) => <DropdownHint heading={"Hint " + (idx + 1)} key = {uuid()}>{item}</DropdownHint>)
              : 
              <div className={classes.emptyList}>
                <p>Sorry! No hints available.</p>
              </div>
            }
          </div>
        }
        {
          (content === "Submissions") &&
          <div className={classes.wrapper}>
            {
              (submissions.length !== 0)
              ?
              submissions.map((item, idx) => 
                <DropdownSubmission heading={"Submission " + (submissions.length - idx)} key={uuid()} date={formatDate(item?.timestamp)}>
                  <p><strong>Time taken: </strong> {(item.time ? item.time : 0) + " seconds"}</p>
                  <br /><p><strong>Memory used: </strong> {item.space + " kb"}</p>
                  <br />
                  <pre className={classes.codeArea}>
                    <code>
                      {item.script}
                    </code>
                  </pre>
                </DropdownSubmission>
              )
              :
              <div className={classes.emptyList}>
                <p>OOPs! No Submissions found</p>
              </div>
            }
          </div>
        }
      </div> 
      }
    </>
  )
}