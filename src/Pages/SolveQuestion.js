import React from "react";
import Question from "../Components/Question";
import CodeEditor from "../Components/CodeEditor";
import classes from "./SolveQuestion.module.css";
import { useLocation, useParams } from "react-router-dom";
import { useGetParticularQuestionQuery } from "../redux/api/api";
import { useErrors } from "../hooks/hooks";

export default function SolveQuestion() {
  const params = useParams();
  const location = useLocation();
  const id = params.questionId;
  const { labId } = location.state || "right";
  const {data, isLoading, isError, error} = useGetParticularQuestionQuery(id);
  useErrors([{isError, error}]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.QuestionNCode}>
        <Question details={data?.question} labId = {labId} />
        {!isLoading && <CodeEditor testCase={data?.question.testCase} labId = {labId} />}
      </div>
    </div>
  );
}