import React, { useState } from 'react';
import classes from "./ProfileCard.module.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useGetProfileQuery } from "../redux/api/api";
import pphoto from "../Assests/profilephoto.png";
import emailicon from "../Assests/email.svg";
import githubicon from "../Assests/github.svg";
import linkednicon from "../Assests/linkedin.svg";
import codecheficon from "../Assests/codechef.png";
import codeforcesicon from "../Assests/codeforces.svg";
import leetcodeicon from "../Assests/leetcode.png";

const ProfileCard = ({ userName, total, role, closeCardFunc }) => {
    const { data, isLoading, isError, error } = useGetProfileQuery({ userName, role });
    const [flip, setFlip] = useState(false);

    // Handle loading and error states
    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Error: {error?.data?.message || "An error occurred."}</p>;
    }

    const user = data?.user || {}; // Ensure user is defined
    const toggleFlip = (e) => {
        e.stopPropagation();
        setFlip((prevFlip) => !prevFlip);
    };

    const solved = user?.questionsSolved?.length || 0;
    const value = (solved / (total * 2)) * 100;

    return (
        <div>
            <div className={classes.mainWrapper} onClick={() => closeCardFunc((prev) => !prev)}>
                <div className={`${classes.flipCardContainer} ${flip ? classes.flip : ""}`} onClick={toggleFlip}>
                    <div className={classes.flipCard}>
                        <div className={classes.flipCardFront}>
                            <div className={classes.profilephoto}>
                                <img src={pphoto} alt="" />
                            </div>
                            <div className={classes.profileName}>
                                <p>{user.name}</p>
                            </div>
                            <div className={classes.rollNumber}>
                                {role === "student" && <p>{user.rollNumber}</p>}
                                {role === "teacher" && <p>{"Teacher"}</p>}
                            </div>
                            <div className={classes.profilelinks}>
                                {user.email && (
                                    <a href={`mailto:${user.email}`} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <img src={emailicon} alt="email" className={classes.iconlinks} />
                                    </a>
                                )}
                                {user.github && (
                                    <a href={user.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <img src={githubicon} alt="github" className={classes.iconlinks} />
                                    </a>
                                )}
                                {user.linkedin && (
                                    <a href={user.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <img src={linkednicon} alt="linkedin" className={classes.iconlinks} />
                                    </a>
                                )}
                                {user.codeforces && (
                                    <a href={user.codeforces} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <img src={codeforcesicon} alt="codeforces" className={classes.iconlinks} />
                                    </a>
                                )}
                                {user.codechef && (
                                    <a href={user.codechef} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <img src={codecheficon} alt="codechef" className={classes.iconlinks} />
                                    </a>
                                )}
                                {user.leetcode && (
                                    <a href={user.leetcode} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                        <img src={leetcodeicon} alt="leetcode" className={classes.iconlinks} />
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className={classes.flipCardBack}>
                            <h1 className={classes.progress_title}>
                                {role === "student" && "PROGRESS"}
                                {role === "teacher" && "BATCHES"}
                            </h1>
                            {role === "student" && (
                                <div className={classes.progress}>
                                    <div className={classes.progress_container}>
                                        <CircularProgressbar
                                            value={value}
                                            styles={buildStyles({
                                                rotation: 0.75,
                                                strokeLinecap: 'round',
                                                pathTransitionDuration: 0.5,
                                                pathColor: `rgba(255, 87, 87)`,
                                                trailColor: '#A8DFEA',
                                                backgroundColor: 'transparent',
                                            })}
                                        />
                                    </div>
                                    <div className={classes.progress_text}>
                                        {solved}/{total}
                                    </div>
                                </div>
                            )}
                            {role === "teacher" && (
                                <div className={classes.batchTags}>
                                    {user.batch?.map((batch, index) => (
                                        <div key={index} className={classes.batchTag}>
                                            {batch}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
