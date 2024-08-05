import React, { useEffect, useState } from 'react';
import classes from "./DropdownSubmission.module.css";
import Timer from "../Components/Timer";
import { useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import { server } from '../Assests/config';
import toast from 'react-hot-toast';


export default function DropdownSubmission({ heading, date, timeLeft, labId, children }) {
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

    return (
        <div className={classes.wrapper}>
            <div className={classes.head} onClick={() => setVisible((prev) => !prev)}>
                <h4 className={classes.data}>
                    {heading}{timeLeft !== undefined && <Timer initialTime={timeLeft} />}
                </h4>
                {console.log(date)}
                <span className={classes.data}>
                    {date}
                    {user.role === "teacher" && (
                        <button
                            className={classes.createLab}
                            onClick={handleStart}
                        >
                            Start
                        </button>
                    )}
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