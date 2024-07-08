import React, { useState } from 'react';
import classes from './CreateLab.module.css';
import { json, useLocation, useNavigate } from 'react-router-dom';
import { server } from "../Assests/config";
import toast from 'react-hot-toast';

const CreateLab = () => {
  const location = useLocation();
  const batch = location.state?.batch;
  console.log(batch);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    batch: (batch ? batch : ''),
    duration: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = formData;
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
          <label htmlFor="duration">Duration</label>
          <input id="duration" name="duration" type="text" required value={formData.duration} onChange={handleChange} placeholder="Enter the duration of Lab, Eg: 3hrs ...."/>
        </div>
        
        <button type="submit" className={classes.submit}>
          Save and Add Questions
        </button>
      </form>
    </div>
  );
};

export default CreateLab;
