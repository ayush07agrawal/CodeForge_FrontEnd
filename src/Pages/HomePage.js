import React, { useRef, useState } from "react";
import QuestionList from "../Components/QuestionList";
import classes from "./HomePage.module.css";
import { v4 as uuid } from "uuid";
import { useGetQuestionsQuery } from "../redux/api/api";
import { useErrors } from "../hooks/hooks";
import TagItem from "../Components/TagItem";
import ProfileCard from "../Components/ProfileCard";

export default function HomePage(){
	const [filterTags, setFilterTags] = useState([]);
	const [studentProfileCardShow, setStudentProfileCardShow] = useState(0);
	const [teacherProfileCardShow, setTeacherProfileCardShow] = useState(0);
	const tag = useRef();
	const studentUserName = useRef();
	const teacherUserName = useRef();
	const allQuestions = useGetQuestionsQuery();
	const errors = [
		{ isError: allQuestions.isError, error: allQuestions.error },
	];
	useErrors(errors);

	return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				{filterTags.length === 0 && allQuestions.data?.questions.map((q, idx) => (
					<QuestionList question={q} num={idx + 1} key={uuid()} />
				))}
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
			<div className={classes.misc}>
				<div className={classes.filters}>
					<div className={classes.newFilters}>
						<h4 className={classes.addFilter}>ADD FILTER:</h4>
						<input
							type="text"
							ref={tag}
							placeholder="Enter the tag..."
							className={classes.userInput}
						/>
						<button
							onClick={() => {
								const val = filterTags.find(
									(item) => item === tag.current.value
								);
								if (val === undefined && tag.current.value !== "") {
									setFilterTags((prev) => [
										...prev,
										tag.current.value.toLowerCase(),
									]);
								}
							}}
							className={classes.miscButton}
						>
							Add
						</button>
					</div>
					<div className={classes.filterList}>
						{filterTags.map((item) => (
							<TagItem
								val={item}
								deleteItem={(val) =>
									setFilterTags((prev) =>
										prev.filter((i) => i !== val)
									)
								}
							/>
						))}
					</div>				
				</div>
				<div className={classes.search}>
					<h4 className={classes.addFilter}>Search Student:</h4>
					<input
						type="text"
						ref={studentUserName}
						placeholder="Enter the student username..."
						className={classes.userInput}
					/>
					<button className={classes.miscButton} onClick={() => setStudentProfileCardShow((prev) => !prev)}>Search</button>
				</div> 
				<div className={classes.search}>
					<h4 className={classes.addFilter}>Search Faculty:</h4>
					<input
						type="text"
						ref={teacherUserName}
						placeholder="Enter the teacher username..."
						className={classes.userInput}
					/>
					<button className={classes.miscButton} onClick={() => setTeacherProfileCardShow((prev) => !prev)}>Search</button>
				</div>
			</div>
			{studentProfileCardShow && <ProfileCard total={allQuestions?.data.questions.length} userName={studentUserName.current.value} role='student' closeCardFunc = {setStudentProfileCardShow}></ProfileCard>}
			{teacherProfileCardShow && <ProfileCard total={allQuestions?.data.questions.length} userName={teacherUserName.current.value} role='teacher' closeCardFunc = {setTeacherProfileCardShow}></ProfileCard>}
		</div>
	);
}
