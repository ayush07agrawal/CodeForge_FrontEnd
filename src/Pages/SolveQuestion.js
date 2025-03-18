import React, { useState } from "react";
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
  const labId = location.state ? location.state.labId : "";
  const { data, isLoading, isError, error } = useGetParticularQuestionQuery(id);
  useErrors([{ isError, error }]);

    // State to handle width
    const [questionWidth, setQuestionWidth] = useState(45);

    // Handle resizing
    const handleMouseDown = (e) => {
      e.preventDefault();
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };
  
    const handleMouseMove = (e) => {
      const newWidth = (e.clientX / window.innerWidth) * 100;
      if (newWidth > 30 && newWidth < 70) {
        setQuestionWidth(newWidth);
      }
    };
  
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

  return (
    <div className={classes.wrapper}>
      <div className={classes.Question} style={{ flex: `${questionWidth}` }}>
        <Question details={data?.question} labId={labId} />
      </div>
      <div className={classes.resizer} onMouseDown={handleMouseDown} />
      <div className={classes.CodeEditor} style={{flex:`${100-questionWidth}`}}>
        {
          !isLoading && (
            <CodeEditor testCase={data?.question.testCase} labId={labId} width={100-questionWidth}/>
          )
        }
      </div>
    </div>
  );
}
