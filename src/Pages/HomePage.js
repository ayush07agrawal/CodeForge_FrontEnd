import React from "react";
import QuestionList from "../Components/QuestionList";
import classes from "./HomePage.module.css";
import { v4 as uuid } from "uuid";
import { useGetQuestionsQuery } from "../redux/api/api";
import { useErrors } from "../hooks/hooks";

// const allQuestions = {
//   data:{
//     questions:[
//       {
//         questionId:1,
//         title:"What is the output of the following code?",
//         tags:["Easy", "Array"],
//       },
//       {
//         questionId:2,
//         title:"What is the output of the following code?",
//         tags:["Medium", "Array"],
//       },
//     ]
//   }
// }

export default function HomePage() {
  const allQuestions = useGetQuestionsQuery();

  const errors = [{ isError: allQuestions.isError, error: allQuestions.error }];
  useErrors(errors);

  return (
    <div className={classes.wrapper}>
      {allQuestions.data?.questions.map((q, idx) => (
        <QuestionList question={q} num={idx + 1} key={uuid()} />
      ))}
    </div>
  );
}
