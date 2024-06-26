import React from 'react';
import classes from "./TextInput.module.css";

function TextInput({children, name, type, label, ...props}) {
  return (
    <div className={name === "secretQuestion" || name==="secretAnswer" ? classes.wrapper : classes.small}>
      <label className={classes.label} htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} placeholder={children} {...props} className={classes.input}/>
    </div>
  )
}

export default TextInput
