import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";
import classes from "./Profile.module.css";
import ProfileHeader from '../Components/ProfileHeader';
import ProfileBody from '../Components/ProfileBody';
import { useSelector } from 'react-redux';
import { useErrors } from '../hooks/hooks';
import { useGetQuestionsQuery } from '../redux/api/api';
import { setURL } from '../redux/reducers/misc';

export default function Profile() {
  const dispatch = useDispatch();
	const location = useLocation();

  const { user } = useSelector((state)=> state.auth);
  const { data, isLoading, isError, error } = useGetQuestionsQuery();

  useErrors([
    { isError: isError, error: error },
  ]);
  const questions = data?.questions;

  useEffect(() => {
		dispatch(setURL(location.pathname));
	}, [dispatch, location])

  return (
    <div className={classes.wrapper}>
      <ProfileHeader profile = {user}></ProfileHeader>
      {user.role !== "teacher" && 
        !isLoading && 
          <ProfileBody questions = {questions} solved_data = {user.questionsSolved}></ProfileBody>
      }
    </div>
  );
}