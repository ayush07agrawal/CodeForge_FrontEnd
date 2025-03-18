import React, { useState } from 'react';
import classes from "./DropdownSubmission.module.css";

export default function DropdownSubmission({ heading, date, children }){
    const [visible, setVisible] = useState(false);

    return (
        <div className={classes.wrapper}>
            <div className={classes.head} onClick={() => setVisible((prev) => !prev)}>
                <h4 className={classes.data}>{heading}</h4>
                <h4 className={classes.data}>{date}</h4>
            </div>
            {visible && 
                <p className={classes.data}>{children}</p>
            }
        </div>
    )
}