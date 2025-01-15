import React, { useEffect, useRef, useState } from "react";
import QuestionList from "../Components/QuestionList";
import classes from "./HomePage.module.css";
import { v4 as uuid } from "uuid";
import { useGetQuestionsQuery } from "../redux/api/api";
import { useErrors } from "../hooks/hooks";
import TagItem from "../Components/TagItem";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setURL } from "../redux/reducers/misc";
import ProfileCard from "../Components/ProfileCard";

const total = 10;
const data = {
	"name" : "Suprit Naik",
	"email" : "22CS01018@iitbbs.ac.in",
	"password":"pass@1233",
	"secretQuestion":"What is this",
	"secretAnswer":"This is it",
	"rollNumber":"22CS01018",
	"photo":"Image1.jpg",
	"questionsSolved": [1,2,3],
	"leetcode": "",
	"codechef": ""
};

const teacherData = {
	"name" : "Shreya Ghosh",
	"email" : "22CS01018@iitbbs.ac.in",
	"password":"pass@1233",
	"secretQuestion":"What is this",
	"secretAnswer":"This is it",
	"rollNumber":"22CS01018",
	"photo":"Image1.jpg",
	"batch":["22Btech","23Btech","24Btech"],
};

export default function HomePage() {
	
	console.log(data);
	const dispatch = useDispatch();
	const location = useLocation();
	const [filterTags, setFilterTags] = useState([]);
	const [profileCardShow, setProfileCardShow] = useState(0);
	const tag = useRef();
	const allQuestions = useGetQuestionsQuery();
	const errors = [
		{ isError: allQuestions.isError, error: allQuestions.error },
	];
	useErrors(errors);

	// useEffect(() => {
	// 	dispatch(setURL(location.pathname));
	// }, [dispatch, location])

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
							className={classes.filterInput}
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
							className={classes.filterBtn}
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
				{/* need to update this in future to search various persons in the future */}
				<button className={classes.miscButton} onClick={()=>setProfileCardShow((prev)=>!prev)}>Search</button>
				
			</div>
			{profileCardShow && <ProfileCard total={total} data={data} role="student" closeCardFunc = {setProfileCardShow}></ProfileCard>}
			{/* {profileCardShow && <ProfileCard total={total} data={teacherData} role="teacher" closeCardFunc = {setProfileCardShow}></ProfileCard>} */}
			
		</div>
	);
}
