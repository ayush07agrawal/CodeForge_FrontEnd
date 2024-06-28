import React from 'react';
import classes from "./ProgressBar.module.css";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const ProgressBar = ({solved,total}) =>{
    const value = solved/(total*2)*100;
    return (
        <div>
            <h1 className={classes.title}>Progress</h1>
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
        </div>
        
    );
};

export default ProgressBar;