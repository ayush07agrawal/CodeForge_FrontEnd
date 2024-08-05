import React from 'react';
import { Link } from 'react-router-dom';
import classes from './DropdownBatch.module.css';

const DropDownBatch=({ children, btnkey, btnUpdate, onClick }) => {
    return(
        <div 
            className = {
                `${classes.wrapper} ${(btnUpdate===1) ? 
                    classes.updateButton:""} ${(btnkey===0) ? classes.firstButton:""}` 
            } 
            onClick = {onClick}
        >
            {(btnUpdate === 1) ? 
                <h2> {children} </h2> :
                <Link to={{
                    pathname: 'lab',
                    search: `?batch=${children}`, 
                }} 
                className = {classes.dropDownLink}>
                    <h2> {children} </h2>
                </Link>
            }
        </div>
    );
}

export default DropDownBatch;