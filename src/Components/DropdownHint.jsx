import React, { useState } from 'react';
import classes from "./DropdownHint.module.css";

export default function DropdownHint({ number, data }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className={classes.wrapper}>
            <div className={classes.head} onClick={() => setVisible((prev) => !prev)}>
                <h4 className={classes.data}>Hint {number}</h4>
                <span className={classes.downArrow + " " + classes.data}></span>
            </div>
            {visible && 
                <p className={classes.data}>{data}</p>
            }
        </div>
    )
}