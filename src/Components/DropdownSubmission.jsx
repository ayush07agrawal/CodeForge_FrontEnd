import React, { useState } from 'react';
import classes from "./DropdownSubmission.module.css";


export default function DropdownSubmission({ heading, date, children }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className={classes.wrapper}>
            <div className={classes.head} onClick={() => setVisible((prev) => !prev)}>
                <h4 className={classes.data}>{heading}</h4>
                <span className={classes.data}>{date}</span>
            </div>
            {visible &&
                <div className={classes.data}>
                    {children}
                </div>
            }
        </div>
    )
}