import React, { useState } from "react";
import QuestionList from "../Components/QuestionList";
import classes from "./HomePage.module.css";
import { v4 as uuid } from "uuid";
import { useGetQuestionsQuery } from "../redux/api/api";
import { useErrors } from "../hooks/hooks";
import SidePanel from "../Components/SidePanel";

export default function HomePage() {
	const [filterTags, setFilterTags] = useState([]);
	const allQuestions = useGetQuestionsQuery();
	const errors = [
		{ isError: allQuestions.isError, error: allQuestions.error },
	];
	useErrors(errors);

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				{
					filterTags.length === 0 && 
					allQuestions.data?.questions.map((q, idx) => (
						<QuestionList question={q} num={idx + 1} key={uuid()} />
					))
				}
				{
					filterTags.length !== 0 && 
					allQuestions.data?.questions
					.filter((q) => {
						return q.tags?.some((tag) => filterTags.includes(tag.toLowerCase()));
					})
					.map((q, idx) => (
						<QuestionList question={q} num={idx + 1} key={uuid()} />
					))
				}
			</div>
			<SidePanel filterTags={filterTags} setFilterTags={setFilterTags} length={allQuestions?.data?.questions?.length} />
		</div>
	);
}
