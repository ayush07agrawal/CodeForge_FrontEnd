import React from 'react';
import classes from "./ProfileBody.module.css";
import QuestionList from "../Components/QuestionList";
import Progressbar from "../Components/Progressbar";

const ProfileBody = ({questions,solved_data})=>{
    console.log(questions);
    console.log(solved_data);
    return(
        <div className={classes.top}>
            <div className={classes.wrapper1}>
                <h1>Solved Problems</h1>
                {solved_data.map((q)=>(
                    <QuestionList question={questions[q]} num = {q+1} key ={q} solved={true} className={classes.Ques}></QuestionList>
                ))} 
            </div>
            <div className={classes.wrapper2}>
                <Progressbar solved={solved_data.length} total={questions.length}></Progressbar>
            </div>
        </div>
        
    );
}
export default ProfileBody;