import React, { useState } from 'react';
import classes from "./DropdownSubmission.module.css";


function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hrs = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return (hrs + ":" + minutes + " " + day + "/" + month + "/" + year);
}

export default function DropdownSubmission({ number, details }) {
    const [visible, setVisible] = useState(false);

    const date = formatDate(details.timestamp);

    return (
        <div className={classes.wrapper}>
            <div className={classes.head} onClick={() => setVisible((prev) => !prev)}>
                <h4 className={classes.data}>Submission {number}</h4>
                <span className={classes.data}>{date}</span>
            </div>
            {visible &&
                <div className={classes.data}>
                    <p><strong>Time taken: </strong> {details.time + " s"}</p>
                    <br /><p><strong>Memory used: </strong> {details.space + " kb"}</p>
                    <br />
                    <pre className={classes.codeArea}>
                        <code>
                            {details.script}
                        </code>
                    </pre>
                </div>
            }
        </div>
    )
}