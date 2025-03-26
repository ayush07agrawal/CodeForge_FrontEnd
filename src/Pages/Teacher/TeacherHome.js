import React, { useState } from "react";
import classes from "./TeacherHome.module.css";
import QuestionList from "../../Components/QuestionList.jsx";
import { v4 as uuid } from "uuid";
import { useGetQuestionsFromTeacherQuery } from "../../redux/api/api";
import { useErrors } from "../../hooks/hooks.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SidePanel from "../../Components/SidePanel.jsx";

export default function TeacherHome() {
  const navigate = useNavigate();
  const [filterTags, setFilterTags] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const allQuestions = useGetQuestionsFromTeacherQuery(user._id);
  // console.log(allQuestions);
  const errors = [{ isError: allQuestions.isError, error: allQuestions.error }];
  useErrors(errors);

  return (
    <>
      {!allQuestions.isLoading && 
        <div className={classes.container}>
          <div className={classes.wrapper1}>
            {allQuestions.data?.questions.map((q, idx) => (
              <QuestionList question={q} num={idx + 1} key={uuid()} />
            ))}
          </div>
          <button onClick={() => navigate("/app/questionform/new")} className={classes.btn}>ADD NEW QUESTION</button>
          <SidePanel filterTags={filterTags} setFilterTags={setFilterTags} length={allQuestions?.data?.questions?.length} />
        </div>
      }
    </>
  );
}