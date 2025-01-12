import React,{useState} from 'react';
import classes from "./ProfileCard.module.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import pphoto from "../Assests/profilephoto.png";
import emailicon from "../Assests/email.svg";
import githubicon from "../Assests/github.svg";
import linkednicon from "../Assests/linkedin.svg";
import codecheficon from "../Assests/codechef.png";
import codeforcesicon from "../Assests/codeforces.svg";
import leetcodeicon from "../Assests/leetcode.png";


const ProfileCard = ({data,total,role,closeCardFunc}) => {
    const [flip,setFlip] = useState(false)
    const toggleFlip = (e) =>{
        e.stopPropagation()
        setFlip(prevFlip => !prevFlip)
    }

    console.log(data);
    console.log(total);
    console.log(role);

    const solved = data.questionsSolved?.length
    const value = solved/(total*2)*100

    return(
        <div>
            <div className={classes.mainWrapper} onClick={()=>closeCardFunc((prev)=>!prev)}>
                <div className={`${classes.flipCardContainer} ${flip ? classes.flip:""}`} onClick={toggleFlip}>
                    <div className={classes.flipCard}>
                        <div className={classes.flipCardFront}>
                            <div className={classes.profilephoto}>
                                <img src={pphoto} alt=""></img>
                                {/* <img src={profile.photo === "" ? pphoto : profile.photo} alt=""></img> */}
                            </div>
                            <div className={classes.profileName}>
                                <p>{data.name}</p>
                            </div>
                            <div className={classes.rollNumber}>
                                {role==="student" && <p>{data.rollNumber}</p>}
                                {role==="teacher" && <p>{"Teacher"}</p>}
                            </div>
                            <div className={classes.profilelinks}>
                                <a href={`mailto:${data.email}`} target="_blank" rel="noopener noreferrer" onClick = {(e) => e.stopPropagation()}>
                                    <img src={emailicon} alt="email" className={classes.iconlinks} style={data.email === "" ? { display: 'none' } : {}} />
                                </a>
                                <a href={data.github} target="_blank" rel="noopener noreferrer" onClick = {(e) => e.stopPropagation()}>
                                    <img src={githubicon} alt="github" className={classes.iconlinks} style={data.github === "" ? { display: 'none' } : {}} />
                                </a>
                                <a href={data.linkedin} target="_blank" rel="noopener noreferrer" onClick = {(e) => e.stopPropagation()}>
                                    <img src={linkednicon} alt="linkedn" className={classes.iconlinks} style={data.linkedin === "" ? { display: 'none' } : {}} />
                                </a>
                                <a href={data.codeforces} target="_blank" rel="noopener noreferrer" onClick = {(e) => e.stopPropagation()}>
                                    <img src={codeforcesicon} alt="codeforces" className={classes.iconlinks} style={data.codeforces === "" ? { display: 'none' } : {}} />
                                </a>
                                <a href={data.codechef} target="_blank" rel="noopener noreferrer" onClick = {(e) => e.stopPropagation()}>
                                    <img src={codecheficon} alt="codechef" className={classes.iconlinks} style={data.codechef === "" ? { display: 'none' } : {}} />
                                </a>
                                <a href={data.leetcode} target="_blank" rel="noopener noreferrer" onClick = {(e) => e.stopPropagation()}>
                                    <img src={leetcodeicon} alt="leetcode" className={classes.iconlinks} style={data.leetcode === "" ? { display: 'none' } : {}} />
                                </a>
                            </div>
                        </div>
                        <div className={classes.flipCardBack}>
                            <h1 className={classes.progress_title}>{role==="student" && "PROGRESS"}{role==="teacher" && "BATCHES"}</h1>
                            {role==="student" && 
                                <div className={classes.progress}>
                                    <div className={classes.progress_container}>
                                        <CircularProgressbar
                                            value={value}
                                            styles={buildStyles({
                                                rotation: 0.75, // Start at the top (0.75 turns, 270 degrees)
                                                strokeLinecap: 'round',
                                                pathTransitionDuration: 0.5,
                                                pathColor: `rgba(255, 87, 87)`,
                                                trailColor: '#A8DFEA',
                                                backgroundColor: 'transparent',
                                            })}
                                        />
                                    </div>
                                    <div className={classes.progress_text}>{solved}/{total}</div>
                                </div>
                            }
                            {role==="teacher" &&
                                <div className={classes.batchTags}>
                                    {data.batch?.map((batch,index) => (
                                        <div key={index} className={classes.batchTag}> {batch} </div>
                                    ))}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;