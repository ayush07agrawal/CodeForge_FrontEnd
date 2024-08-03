import React from 'react';
import classes from "./TextInput.module.css";

function TextInput({children, name, type, label, width, ...props}) {
  return (
    <div className={width === "small" ? classes.small : classes.wrapper}>
      <label className={classes.label} htmlFor={name}>{label}</label>
      <input type={type} name={name} id={name} placeholder={children} {...props} className={classes.input}/>
    </div>
  )
}

export default TextInput