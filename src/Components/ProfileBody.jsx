import React from 'react';
import classes from "./ProfileBody.module.css";
import QuestionList from "./QuestionList";
import Progressbar from "./ProgressBar";

const ProfileBody = ({ questions, solved_data }) => {
    return(
        <div className={classes.top}>
            {/* <div className={classes.wrapper1}>
                <h1>Solved Problems</h1>
                {solved_data?.map((q)=>(
                    <QuestionList question={questions[q]} num = {q+1} key ={q._id} solved={true} className={classes.Ques}></QuestionList>
                ))} 
            </div> */}
            <div className={classes.wrapper2}>
                <Progressbar solved = {solved_data?.length} total = {questions?.length}></Progressbar>
            </div>
        </div>
    );
}

export default ProfileBody;
