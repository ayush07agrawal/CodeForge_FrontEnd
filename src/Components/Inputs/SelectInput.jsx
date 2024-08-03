import React from 'react';
import classes from "./SelectInput.module.css";

export default function SelectInput({name, values, handleChange, size="1"}) {
  return (
    <div>
      <select name={name} id={name} onChange={(event) => handleChange(event)} size={size} className={classes.select}>
        {values.map((val, index) => <option key={val} value={val}>{val}</option>)}
      </select>
    </div>
  )
}