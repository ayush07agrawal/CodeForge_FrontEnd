import React from 'react';
import classes from "./QuestionList.module.css";
import easyimg from "../Assests/greensolve.png";
import hardimg from "../Assests/redsolve.png";
import mediumimg from "../Assests/yellowsolve.png";
import solvedimg from "../Assests/solved.png";
import { Link } from 'react-router-dom';

const QuestionList = ({ question, num, solved = false }) => {
    return (
        <Link to = {"/app/question/"+question._id} className={classes.wrapper}>
            <div className={classes.first}>
                <div>
                    <p className={classes.num}><span className={(question.tags[0] === 'easy') ? classes.easycolor :
                        (question.tags[0] === 'medium') ? classes.mediumcolor : classes.hardcolor}>{num}</span></p>
                </div>
                <div>
                    <p className={classes.title}>{question.title}</p>
                    <div className={classes.tags}>
                        {question.tags.map((tag, idx) => (
                            <span key={idx} className={classes.tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={classes.second}>
                <img src={(solved === true) ? solvedimg : (question.tags[0] === 'easy') ? easyimg : (question.tags[0] === 'medium') ? mediumimg : hardimg} alt="" />
            </div>
        </Link>
    );
};

export default QuestionList;