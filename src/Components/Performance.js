import React,{ useState } from 'react';
import classes from './Performance.module.css';
import easyimg from "../Assests/greensolve.png";
import hardimg from "../Assests/redsolve.png";
import mediumimg from "../Assests/yellowsolve.png";

const Performance = ({ show, handleShowPerformance, labId, report, totalLabs, labQuestions, batch }) => {
    const [studentIndex, setStudentIndex] = useState(-1);
    const [questionIndex, setQuestionIndex] = useState(-1);

    const submitScoreHandler = () => {
        console.log(labId);
        console.log(report);
    }

    return(
        <div 
            className = {show ? classes.displayBlock : classes.displayNone} 
            onClick = {() => {
                handleShowPerformance(false);
            }}
        >
            <div className = {classes.popupMain} onClick = {(e) => e.stopPropagation()}>
                {batch ? <h1>Batch Performance Report </h1> : <h1>Lab Performance Report</h1>}
                <div className = {classes.tableMain}>
                    <table className = {`${classes.table} ${classes.tableIntro} ${batch ? classes.tableBatchIntro:''}`}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Roll Number</th>
                                <th className = {classes.name}>Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {report?.map(( student, index )=>                             
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{student.rollNumber}</td>
                                    <td className = {classes.name}>{student.name}</td>
                                </tr>
                            )}         
                        </tbody>
                    
                    </table>

                    <table className = {`${classes.table} ${classes.tableQuestion} ${batch ? classes.tableBatchlab:''}`}>
                        <thead>
                            {batch ?
                                <tr>
                                    {[...Array(totalLabs)].map((_,index)=>
                                        <th key={index}>LAB-{index+1}  ({100})</th>
                                    )}
                                </tr>
                                :
                                <tr>
                                    {labQuestions?.map((question,index)=>
                                        <th key={index}>
                                            <div className={classes.second}  style={{display:'flex', justifyContent:'center', gap:'10px'}}>
                                                <img src={(question?.tag === 'easy') ? easyimg : (question?.tag === 'medium') ? mediumimg : hardimg} alt="" />
                                                <div className={(question?.tag === 'easy') ? classes.greenTextShade : (question?.tag === 'medium') ? classes.yellowTextShade : classes.redTextShade}>
                                                    Q{index+1}  ({question.numTestCase})
                                                </div>
                                            </div>                                       
                                        </th>
                                    )}
                                </tr>
                            } 
                        </thead>

                        <tbody>
                            {batch ?
                            report?.map((student,index)=>
                                <tr key={index}>
                                    {[...Array(totalLabs)].map((_,index)=>{
                                        const labKey = `lab${index + 1}`;
                                        const width  = student[labKey];
                                        return(
                                            <td key={index}>
                                                <div>{width}</div>
                                                <div className={classes.bar}>                                                        
                                                    <div className={classes.fill} style={{width:`${width}%`, backgroundColor:`rgb(${150-width/100*150}, 227, 227)`}}></div>
                                                    <div className={classes.ball} style={{left:`${width-5}%`}}></div>
                                                </div>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                            :
                            report?.map(( student, sind )=>                             
                                <tr key = {sind}>
                                    {labQuestions?.map(( question, index ) => { 
                                        const questionKey = `question${index + 1}`;
                                        const width = student[questionKey]/question.numTestCase*100;                                 
                                        return  <td key={index} 
                                                    onClick={()=>{
                                                        setStudentIndex(sind);
                                                        setQuestionIndex(index);
                                                    }} 
                                                    className={classes.codeShowtd}
                                                >                                                       
                                                    <div>{student[questionKey]===undefined?"Not Attempted":student[questionKey]}</div>
                                                    <div className={classes.bar}>                                                        
                                                        <div className={classes.fill} style={{width:`${width}%`, backgroundColor:`rgb(${150-width/100*150}, 227, 227)`}}></div>
                                                        <div className={classes.ball} style={{left:`${width-3}%`}}></div>
                                                    </div>
                                                    {sind===studentIndex && questionIndex===index && codePopUp({ student })}                                                    
                                                </td>
                                    })}
                                </tr>
                            )}         
                        </tbody>
                    </table>

                    <table className = {`${classes.table} ${classes.tableScore}`}>
                        <thead>
                            <tr>
                                <th>Total Score</th>
                            </tr>
                        </thead>

                        <tbody>
                            {report?.map(( student, i )=>                             
                                <tr key={i}>
                                    {batch ?
                                        <td className={classes.scoreUpdateWrapper}>
                                            <h3>{student.totalScore}</h3>
                                        </td>
                                    : 
                                        ScoreUpdate({student, labQuestions})
                                    }
                                </tr>
                            )}         
                        </tbody>                        
                    </table>
                </div>                
                <div className = {classes.btnSection}>
                    <button className = {classes.btn}>Create Report</button>
                    {!batch && <button className = {`${classes.btn} ${classes.submitButton}`} onClick = {submitScoreHandler}>Submit Score</button>}
                </div>
            </div>
        </div>
    );
}


const ScoreUpdate = ({ student, labQuestions }) => {
    const easyRatio = 2;
    const mediumRatio = 5;
    const hardRatio = 7;
    let defaultScore = 0;
    let count = 0;

    labQuestions?.map((question,index)=>{       
        const questionKey = `question${index + 1}`;
        let temp = (student[questionKey]===undefined?0:student[questionKey])/question.numTestCase;        

        if(question.tag === 'easy'){
            temp*=easyRatio;
            count+=easyRatio;
        }
        else if(question.tag === 'medium'){
            temp*=mediumRatio;
            count+=mediumRatio;
        }
        else if(question.tag === 'hard'){
            temp*=hardRatio;
            count+=hardRatio;
        }
        defaultScore += temp;        
    })

    defaultScore = Math.round(defaultScore/count*100);

    const [score, setScore]  = useState(defaultScore);
    const [update, setUpdate] = useState(false);

    const toggleClick=()=>{
        setUpdate(!update);
    }
    const handleChangeInput=(e)=>{
        setScore(e.target.value);
        student.score = score;
    }

    return(
        <td className={classes.scoreUpdateWrapper}>
            {update ? 
                <div className={classes.inputScore}>
                    <input id="score" name="score" type="number" required value={score} onChange={handleChangeInput} min="0" max="100"/>
                    <button onClick={toggleClick}>➕</button>
                </div>
                :
                <h3 onClick={toggleClick}>
                    {score}
                </h3>
            }
        </td>        
    );
}

const codePopUp = ({ student })=>{
    console.log(student.code1);
    return(
        <div className={classes.codeWrapper}>
            {student.code2}
        </div>        
    );
}

export default Performance;
