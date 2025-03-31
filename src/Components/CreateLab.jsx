import React, { useState } from 'react';
import classes from './CreateLab.module.css';
import { json, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCreateLabMutation } from '../redux/api/api';

const CreateLab = () => {
  const location = useLocation();
  const batch = location.state?.batch;
  const navigate = useNavigate();
  const [createLab] = useCreateLabMutation();
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

    try {
      const response = await createLab(data);

      if (!response.data.success) {
        throw json(
          { message: "Error while loading the data..." },
          { status: 500 }
        );
      } 
      else {
        const labId = response.data.lab._id;
        navigate("/app/questionform/new", { state: { labId: labId, batch: batch } });
      }
    } 
    catch (error) {
      toast.error(error.message);
      console.error("Error submitting lab:", error);
      navigate("..");
    }
  };

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