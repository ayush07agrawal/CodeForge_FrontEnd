import React, { useRef, useState } from 'react';
import classes from "./DropdownSubmission.module.css";
import Timer from "../Components/Timer";
import { useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import { server } from '../Assests/config';
import toast from 'react-hot-toast';


export default function DropdownSubmission({ heading, date, timeLeft, labId, isStart, isEnd, children }){
    const time = useRef();
    const user = useSelector((state) => state.auth.user);
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();

    async function handleStart() {
        try {
            const response = await fetch(`${server}/api/v1/lab/startLab/${labId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (!response.ok) {
                throw json(
                    { message: "Error starting the Lab" },
                    { status: 500 }
                );
            } else {
                navigate("..");
            }
        } catch (error) {
            toast.error(error.message);
            console.error("Error submitting code:", error);
        }
    }

    async function handleExtend() {
        // console.log("Heelloo");
        // console.log(time.current.value*60);
        try {
            const response = await fetch(`${server}/api/v1/lab/extendLab/${labId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    extendTime:time.current.value*60
                }),
                credentials: "include",
            });
            if (!response.ok) {
                throw json(
                    { message: "Error starting the Lab" },
                    { status: 500 }
                );
            } else {
                navigate("..");
            }
        } catch (error) {
            toast.error(error.message);
            // console.error("Error submitting code:", error);
        }
    }
    console.log(date);
    return (
        <div className={classes.wrapper}>
            <div className={classes.head} onClick={() => setVisible((prev) => !prev)}>
                <h4 className={classes.data}>
                    {heading}{timeLeft !== undefined && <Timer initialTime={timeLeft} />}
                </h4>
                <span className={classes.data}>
                    {date}
                    {
                        user.role === "teacher" &&
                        (
                            (!isStart && !isEnd &&
                                <button className={classes.timingBtn} onClick={handleStart}> 
                                    Start 
                                </button>
                            )
                            ||
                            (isStart && !isEnd && 
                                <>
                                    <input
                                        type="number"
                                        ref={time}
                                        className={classes.extendInput}
                                    />
                                    <p>Mins </p>
                                    <button className={classes.timingBtn} onClick={handleExtend}> Extend </button>
                                </>
                            )
                        )
                    }
                </span>
            </div>
            {visible &&
                <div className={classes.data}>
                    {children}
                </div>
            }
        </div>
    )
}