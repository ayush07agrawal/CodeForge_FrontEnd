import React from "react";
import classes from "./TeacherHome.module.css";
import QuestionList from "../../Components/QuestionList.jsx";
import { v4 as uuid } from "uuid";
import { useGetQuestionsFromTeacherQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TeacherHome() {
  const { user } = useSelector((state) => state.auth);
  const allQuestions = useGetQuestionsFromTeacherQuery(user._id);
  const errors = [{ isError: allQuestions.isError, error: allQuestions.error }];
  useErrors(errors);
  const navigate = useNavigate();

  return (
    <div>
      <div className={classes.wrapper1}>
        <h1>Questions</h1>
        {allQuestions.data?.questions.map((q, idx) => (
          <QuestionList question={q} num={idx + 1} key={uuid()} />
        ))}
      </div>
      <button onClick={() => navigate("/app/questionform/new")} className={classes.fixedBtn}>ADD NEW QUESTION</button>
    </div>
  );
}
