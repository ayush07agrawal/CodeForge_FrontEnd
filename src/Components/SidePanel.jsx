import classes from "./SidePanel.module.css";
import {useRef, useState} from 'react';
import ProfileCard from "../Components/ProfileCard";
import TagItem from "../Components/TagItem";

export default function SidePanel({filterTags, setFilterTags, length}){
    const tag = useRef();
	const studentUserName = useRef();
	const teacherUserName = useRef();
    const [studentProfileCardShow, setStudentProfileCardShow] = useState(0);
    const [teacherProfileCardShow, setTeacherProfileCardShow] = useState(0);
    return(
        <div>
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
			{studentProfileCardShow && <ProfileCard total={length} userName={studentUserName.current.value} role='student' closeCardFunc = {setStudentProfileCardShow}></ProfileCard>}
			{teacherProfileCardShow && <ProfileCard total={length} userName={teacherUserName.current.value} role='teacher' closeCardFunc = {setTeacherProfileCardShow}></ProfileCard>}
        </div>
    );
}