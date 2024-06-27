import React from 'react';
import QuestionList from "../Components/QuestionList";
import classes from "./HomePage.module.css";
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useGetQuestionsQuery } from '../redux/api/api';
import { useErrors } from '../hooks/hooks';

export default function HomePage() {
  const allQuestions = useGetQuestionsQuery();

  const errors = [
    { isError: allQuestions.isError, error: allQuestions.error },
  ] 
  useErrors(errors);

  return (    
    <div className={classes.wrapper}>
      {allQuestions.data?.questions.map((q, idx)=>(
        <Link to = {"question/"+q._id} key = {uuid()}>
          <QuestionList question = {q} num = {idx+1} />
        </Link>
      ))}      
    </div>
  )
}

