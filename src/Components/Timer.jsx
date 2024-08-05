import React, {useState,useEffect} from 'react';
import classes from "./Timer.module.css"

export default function Timer({initialTime}){
    const [time,setTime] = useState(initialTime);

    useEffect(()=>{
        if(time>0){
            const timerId = setInterval(()=>{
                setTime((prevTime)=>prevTime-1);
            },1000);
            return ()=>clearInterval(timerId);
        }
    }, [time]);

    return (
        <div className={classes.wrapper}>
            <p> Time Remaining - <strong>{Math.floor(time/3600)}:{Math.floor(time/60)%60}:{time%60}</strong></p>
        </div>
    )
}