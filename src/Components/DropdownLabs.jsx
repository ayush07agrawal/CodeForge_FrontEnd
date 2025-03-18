import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import classes from "./DropdownLabs.module.css";
import Timer from "./Timer";
import { useExtendLabMutation, useStartLabMutation } from '../redux/api/api';

export default function DropdownSubmission({ heading, date, lab, children, setLab, handleShowPerformance }) {
    const time = useRef();
    const navigate = useNavigate();
    const [startLab] = useStartLabMutation();
    const [extendLab] = useExtendLabMutation();
    const user = useSelector((state) => state.auth.user);
    let labId, isStart, isEnd, duration;

    if(lab) {
        ({ labId, isStart, isEnd, duration } = lab);
    }
    
    const timeLeft = (isStart && !isEnd) ? duration : undefined;

    const [visible, setVisible] = useState(false);

    async function handleStart() {
        try {
            // const response = await fetch(`${server}/api/v1/lab/startLab/${labId}`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     credentials: "include",
            // });
            const response = await startLab(labId);
            if (!response.data.success) {
                throw json(
                    { message: "Error starting the Lab" },
                    { status: 500 }
                );
            } 
            else {
                navigate("..");
            }
        } 
        catch (error) {
            toast.error(error.message);
            console.error("Error submitting code:", error);
        }
    }

    async function handleExtend() {
        // console.log("Heelloo");
        // console.log(time.current.value*60);
        try {
            const current_time = time.current.value * 60;
            const response = await extendLab({ labId, current_time }).unwrap();
            // const response = await fetch(`${server}/api/v1/lab/extendLab/${labId}`, {
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //         extendTime:time.current.value*60
            //     }),
            //     credentials: "include",
            // });
            if (!response.data.success) {
                throw json(
                    { message: "Error starting the Lab" },
                    { status: 500 }
                );
            } 
            else {
                navigate("..");
            }
        } 
        catch (error) {
            toast.error(error.message);
            // console.error("Error submitting code:", error);
        }
    }

    // const createPerformance = async() => {
    //     const toastId = toast.loading("Creating performance report .... ");
    //     setIsLoading(true);

    //     try {
    //         const { data } = await axios.post(`${server}/api/v1/lab/createReport/${labId}`,);
    //         toast.success(data.message, { id: toastId });
    //     }
    //     catch (error) {
    //         toast.error(error?.response?.data?.message || "Something went wrong", { id: toastId });
    //     }
    //     finally { setIsLoading(false) }
    // }

    const handlePerformanceClick = () => {
        setLab(lab);
        handleShowPerformance(true);
    }

    // console.log(date);
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
                            <div>
                                <button onClick={(e)=>{
                                    e.stopPropagation();
                                    handlePerformanceClick();
                                }}>
                                    View Performance
                                </button>
                                {(!isStart && !isEnd &&
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
                                )}
                            </div>
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