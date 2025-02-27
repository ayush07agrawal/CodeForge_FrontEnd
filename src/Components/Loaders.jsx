import React from 'react';
import classes from './Loaders.module.css';

const LayoutLoader = () => {
  return (
    <div className={classes.loaderContainer}>
      <div className={classes.loader}></div>
    </div>
  );
};

export { LayoutLoader };