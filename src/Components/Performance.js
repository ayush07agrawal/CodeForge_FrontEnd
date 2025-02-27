import React,{ useState } from 'react';
import classes from './Performance.module.css';
import easyimg from "../Assests/greensolve.png";
import hardimg from "../Assests/redsolve.png";
import mediumimg from "../Assests/yellowsolve.png";
import { useAsyncMutation } from '../hooks/hooks';
import { useUpdateScoreMutation } from '../redux/api/api';

const Performance = ({ show, handleShowPerformance, labId, report, totalLabs, labQuestions, batch }) => {
    const [studentIndex, setStudentIndex] = useState(-1);
    const [questionIndex, setQuestionIndex] = useState(-1);
    const [scores, setScores] = useState(report.map((student) => student.score));
    const [updateScore] = useAsyncMutation(useUpdateScoreMutation);
    console.log(scores);
    console.log(report);
    console.log(labQuestions);

    const submitScoreHandler = () => {
        console.log(scores);
        updateScore("Updating scores....", { labId, scores });
    }

    const closeCodePopUp = ()=>{
        setStudentIndex(-1);
        setQuestionIndex(-1);
    }

    return(
        <div 
            className = {show ? classes.displayBlock : classes.displayNone} 
            onClick = {() => {
                handleShowPerformance(false);
            }}
        >
            <div className = {classes.popupMain} onClick = {(e) => e.stopPropagation()}>
                {batch ? <h1>Batch Performance Report</h1> : <h1>Lab Performance Report</h1>}
                <div className = {classes.tableMain}>
                    <table className = {`${classes.table} ${classes.tableIntro} ${batch ? classes.tableBatchIntro : ''}`}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Roll Number</th>
                                <th className = {classes.name}>Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {report?.map(( student, index ) =>                             
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{student.rollNumber}</td>
                                    <td className = {classes.name}>{student.name}</td>
                                </tr>
                            )}         
                        </tbody>
                    
                    </table>
                    
                    <div className={classes.scrollableTable}>
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
                                        const codeKey = `code${index + 1}`;
                                        const width = student[questionKey]/question.numTestCase*100;                                 
                                        return  <td key={index} 
                                                    onClick={()=>{
                                                        setStudentIndex(sind);
                                                        setQuestionIndex(index);
                                                    }} 
                                                    className={classes.codeShowtd}
                                                >                                                       
                                                    <div>{student[codeKey]===""?"Not Attempted":student[questionKey]}</div>
                                                    <div className={classes.bar}>                                                        
                                                        <div className={classes.fill} style={{width:`${width}%`, backgroundColor:`rgb(${150-width/100*150}, 227, 227)`}}></div>
                                                        <div className={classes.ball} style={{left:`${width-3}%`}}></div>
                                                    </div>
                                                    {sind===studentIndex && questionIndex===index && codePopUp( student,index,closeCodePopUp,labQuestions[index].tag,labQuestions[index].numTestCase )}                                               
                                                </td>
                                    })}
                                </tr>
                            )}         
                        </tbody>
                        </table>
                    </div>

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
                                        // ScoreUpdate({student, labQuestions})
                                        <ScoreUpdate 
                                            setScores = {setScores}
                                            defaultScore = {student.score}
                                            i = {i}
                                        />
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


const ScoreUpdate = ({ setScores, defaultScore, i }) => {
    const [score, setScore]  = useState(defaultScore);
    const [update, setUpdate] = useState(false);

    const toggleClick = () => {
        setUpdate(!update);
    }
    const handleChangeInput = (e) => {
        setScore(e.target.value);
        setScores(prevScores => 
            prevScores.map((score, index) => 
              index === i ? e.target.value : score
            )
        );
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

const codePopUp = ( student,questionIndex,closeCodePopUp,tag,numTestCase )=>{
    const codeKey = `code${questionIndex + 1}`;
    const questionKey = `question${questionIndex + 1}`;
    console.log(student);
    console.log(tag);
    return(
        <>
            <div className={classes.codeWrapper}>
                <div className={classes.codeGrid}>
                    <div className={classes.codeQuestion}>
                        <img src={(tag === 'easy') ? easyimg : (tag === 'medium') ? mediumimg : hardimg} alt="" />
                        <div className={(tag === 'easy') ? classes.greenTextShade : (tag === 'medium') ? classes.yellowTextShade : classes.redTextShade}>
                            Q{questionIndex+1}
                        </div>
                    </div>
                    <div className={classes.codePersonal}>
                        <div className={classes.codeComponent}>
                            <div>NAME : </div>  
                            <div>{student.name}</div>
                        </div>
                        <div className={classes.codeComponent}> 
                            <div>ROLL NO. : </div>
                            <div>{student.rollNumber}</div>
                        </div>
                    </div>
                    <div className={classes.codeMarksArea}>
                        <div className={classes.codeComponent}>
                            <div>TEST CASES PASSED : </div>  
                            <div>{student[questionKey]}/{numTestCase}</div>
                        </div>
                        <div className={classes.codeComponent}> 
                            <div>MARKS OBTAINED : </div>
                            <div>{(tag==="easy")?student[questionKey]*2:(tag==="medium")?student[questionKey]*5:student[questionKey]*7}</div>
                        </div>
                    </div>
                </div>
                <pre className={classes.codeArea}>
                    <code>{student[codeKey]}</code>
                </pre>
            </div>
            <div 
                className={classes.wholeCodeWrapper} 
                onClick={(e)=>{
                        e.stopPropagation();
                        closeCodePopUp();
                    }
            }></div>  
        </>
    );
}

export default Performance;
