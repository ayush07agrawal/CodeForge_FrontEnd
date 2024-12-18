import React, { useEffect, useState } from 'react';
import classes from './CreateLab.module.css';
import { json, useLocation, useNavigate } from 'react-router-dom';
import { server } from "../Assests/config";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setURL } from '../redux/reducers/misc';

const CreateLab = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const batch = location.state?.batch;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    batch: (batch ? batch : ''),
    duration: 0,
    hours: '',
    minutes: '',
    seconds: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {...formData};
    data.duration = (data.hours*3600) + (data.minutes*60) + (data.seconds*1);
    delete data.hours;
    delete data.minutes;
    delete data.seconds;
    console.log(data);
    try {
      const response = await fetch( `${server}/api/v1/lab/createLab`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
      });
      if (!response.ok) {
        throw json(
          { message: "Error while loading the data..." },
          { status: 500 }
        );
      } else {
        const resData = await response.json();
        console.log(resData); 
        const labId = resData.lab._id;
        navigate("/app/questionform/new", { state: { labId: labId } });
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error submitting code:", error);
      navigate("..");
    }
  };

  // useEffect(() => {
  //   dispatch(setURL(location.pathname));
  // })

  return (
    <div className={classes.wrapper}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <h1>LAB</h1>
        
        <div className={classes.inputField}>
          <label htmlFor="topic">Topic</label>
          <input id="topic" name="topic" type="text" required value={formData.topic} onChange={handleChange} placeholder="Enter the topic..."/>
        </div>
        
        <div className={classes.inputField}>
          <label htmlFor="date">Date</label>
          <input id="date" name="date" type="date" required value={formData.date} onChange={handleChange}/>
        </div>
        
        <div className={classes.inputField}>
          <label htmlFor="batch">Batch</label>
          <input id="batch" name="batch" type="text" required value={formData.batch} readOnly/>
        </div>
        
        <div className={classes.inputField}>
          <label htmlFor="duration">Duration (Hr:Min:Sec) </label>
          <div className={classes.durationInput}>
            <input id="hours" name="hours" type="number" required value={formData.hours} onChange={handleChange} min="0" max="24" placeholder='0'/> 
            <span>:</span>
            <input id="minutes" name="minutes" type="number" required value={formData.minutes} onChange={handleChange} min="0" max="60" placeholder='0'/> 
            <span>:</span>
            <input id="seconds" name="seconds" type="number" required value={formData.seconds} onChange={handleChange} min="0" max="60" placeholder='0'/> 
          </div>          
        </div>
        
        <button type="submit" className={classes.submit}>
          Save and Add Questions
        </button>
      </form>
    </div>
  );
};

export default CreateLab;