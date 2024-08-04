import React from 'react';
import classes from "./TagItem.module.css"

export default function TagItem({val, deleteItem}){
  return (
    <div className={classes.wrapper}>
      <p>{val}</p>
      <span onClick={() => deleteItem(val)} className={classes.close}>X</span>
    </div>
  )
}