import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TextInput from "../../Components/Inputs/TextInput";
import classes from "./QuestionForm.module.css";

function QuestionForm() {
  const params = useParams();
  const [difficulty, setDifficulty] = useState();
  const editing = params.type === "edit";
  const newQ = params.type === "new";

  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <h1>{(editing ? "Update" : "New") + " Question"}</h1>
        <div className={classes.input}>
          <TextInput
            width="small"
            name="title"
            type="text"
            label="Question Title"
            required
          >
            Enter the title of question...
          </TextInput>
          
          <TextInput
            width="small"
            name="tags"
            type="text"
            label="Topic Tags"
            required
          >
            Enter the topic tags... (Eg: Arrays,Tree...)
          </TextInput>

          <div className={classes.small}>
          <label className={classes.label}  htmlFor="difficulty">Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            onChange={(event) => setDifficulty(event.target.value)}
            size="3"
            className={classes.select}
            value={difficulty}
          >
            {["easy", "medium", "hard"].map((val, index) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
          </div>


          <div className={classes.inwrapper}>
          <label className={classes.label}  htmlFor="description">Description</label>
          <textarea name="decription" id="description" required className={classes.desc}/>
          </div>

          <TextInput name="tags" type="text" label="Testcases" required>
            Enter in one line, only insert $$ for separating the testcases...
          </TextInput>

          <TextInput name="tags" type="text" label="Answers" required>
            Order should match the order of testcases, insert $$ for separating answers of tescases...
          </TextInput>
        </div>

        <button className={classes.btn2} type="submit">
          {editing ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
