import React from 'react';
import classes from "./ProfileBody.module.css";
import QuestionList from "./QuestionList";
import ProgressBar from "./ProgressBar";

const ProfileBody = ({ questions, solved_data }) => {
    console.log(solved_data);
    return(
        <div className={classes.top}>
            <div className={classes.wrapper1}>
                <h1>Solved Problems</h1>
                {questions?.map((q, index)=>(
                    (solved_data.includes(q._id)) && 
                        <QuestionList question={q} num = {index+1} key ={q._id} solved={true} className={classes.Ques}></QuestionList>
                ))} 
            </div>
            <div className={classes.wrapper2}>
                <ProgressBar solved = {solved_data?.length} total = {questions?.length}></ProgressBar>
            </div>
        </div>
    );
}

export default ProfileBody;