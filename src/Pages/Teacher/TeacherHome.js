import React, { useEffect } from "react";
import classes from "./TeacherHome.module.css";
import QuestionList from "../../Components/QuestionList.jsx";
import { v4 as uuid } from "uuid";
import { useGetQuestionsFromTeacherQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setURL } from "../../redux/reducers/misc.js";

export default function TeacherHome() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const allQuestions = useGetQuestionsFromTeacherQuery(user._id);
  const errors = [{ isError: allQuestions.isError, error: allQuestions.error }];
  useErrors(errors);

  useEffect(() => {
		dispatch(setURL(location.pathname));
	}, [dispatch, location])

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