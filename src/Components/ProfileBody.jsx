import React, { useRef, useState } from 'react';
import classes from "./ProfileBody.module.css";
import QuestionList from "./QuestionList";
import TagItem from './TagItem';

const ProfileBody = ({ questions, solved_data }) => {
    const tag = useRef();
    const [filterTags, setFilterTags] = useState([]);
    return (
        <div className={classes.top}>
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
            <div className={classes.wrapper1}>
                <h1>Solved Problems</h1>
                {
                    filterTags.length === 0 &&
                    questions?.map((q, index) => (
                        (solved_data.includes(q._id)) &&
                        <QuestionList question={q} num={index + 1} key={q._id} solved={true} className={classes.Ques}></QuestionList>
                    ))
                }
                {
                    filterTags.length !== 0 &&
                    questions
                        .filter((q) => {
                            return q.tags?.some((tag) => filterTags.includes(tag.toLowerCase()));
                        })
                        ?.map((q, index) => (
                            (solved_data.includes(q._id)) &&
                            <QuestionList question={q} num={index + 1} key={q._id} solved={true} className={classes.Ques}></QuestionList>
                        ))
                }
            </div>
        </div>
    );
}

export default ProfileBody;