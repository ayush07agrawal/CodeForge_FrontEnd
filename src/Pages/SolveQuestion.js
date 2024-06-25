import React from "react";
import Question from "../Components/Question";
import CodeEditor from "../Components/CodeEditor";
import classes from "./SolveQuestion.module.css";
import { json, useLoaderData } from "react-router-dom";

export default function SolveQuestion() {
  const data = useLoaderData();
  return (
    <div className={classes.wrapper}>
      <div className={classes.QuestionNCode}>
        <Question details={data} />
        <CodeEditor testCase={data.testCase} />
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const id = params.questionId;
  const response = await fetch("http://localhost:4173/api/v1/question/" + id);
  if (!response.ok) {
    throw json({ message: "Error while loading the data..." }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData?.question;
  }
}
