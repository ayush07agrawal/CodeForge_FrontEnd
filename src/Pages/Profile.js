import React from "react";
import classes from "./Profile.module.css";
import ProfileHeader from "../Components/ProfileHeader";
import ProfileBody from "../Components/ProfileBody";
import { useSelector } from "react-redux";
import { useErrors } from "../hooks/hooks";
import { useGetQuestionsQuery } from "../redux/api/api";

export default function Profile() {
	const { user } = useSelector((state) => state.auth);
	const { data, isLoading, isError, error } = useGetQuestionsQuery();
	useErrors([{ isError: isError, error: error }]);
	const questions = data?.questions;
	return (
		<div className={classes.wrapper}>
			<ProfileHeader profile={user}></ProfileHeader>
			{!isLoading && (
				<ProfileBody
					questions={questions}
					solved_data={user.questionsSolved}
				></ProfileBody>
			)}
		</div>
	);
}
