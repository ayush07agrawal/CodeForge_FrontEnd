import React, { useState } from "react";
import { useParams } from "react-router-dom";
import TextInput from "../../Components/Inputs/TextInput";
import classes from "./QuestionForm.module.css";

function QuestionForm() {
  const params = useParams();
  const [difficulty, setDifficulty] = useState();
  const editing = params.type === "edit";
  const newQ = params.type === "new";

  const [testCases, setTestCases] = useState([
    { id: 1, testcase: "", answer: "" },
  ]);
  const [hints, setHints] = useState([""]);

  const addTestCase = () => {
    setTestCases([
      ...testCases,
      { id: testCases.length + 1, testcase: "", answer: "" },
    ]);
  };

  const handleTestCaseChange = (index, event) => {
    console.log(event);
    const newTestCases = [...testCases];
    newTestCases[index][event.target.name] = event.target.value;
    setTestCases(newTestCases);
    console.log(testCases); //for testing purposes
  };

  const deleteTestCase = (index) => {
    const newTestCases = testCases
      .filter((value, i) => i !== index)
      .map((tc, idx) => ({ ...tc, id: idx + 1 }));
    setTestCases(newTestCases);
  };

  const addHints = () => {
    setHints([...hints, ""]);
  };

  const handleHintsChange = (index, event) => {
    const newhints = [...hints];
    newhints[index] = event.target.value;
    setHints(newhints);
    console.log(hints); //for testing purposes
  };

  const deleteHints = (index) => {
    const newhints = hints.filter((value, i) => i !== index);
    console.log(newhints);
    setHints(newhints);
  };

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
            <label className={classes.label} htmlFor="difficulty">
              Difficulty
            </label>
            <select
              name="difficulty"
              id="difficulty"
              onChange={(event) => setDifficulty(event.target.value)}
              className={classes.select}
              value={difficulty}
              required
            >
              {["easy", "medium", "hard"].map((val, index) => (
                <option key={val} value={val}>
                  {val}
                </option>
              ))}
            </select>
          </div>

          <div className={classes.inwrapper}>
            <label className={classes.label} htmlFor="description">
              Description
            </label>
            <textarea
              name="decription"
              id="description"
              required
              className={classes.desc}
            />
          </div>

          <div className={classes.inwrapper}>
            <label className={classes.label} htmlFor="constraint">
              Constraints
            </label>
            <textarea
              name="constarint"
              id="constraint"
              required
              className={classes.desc}
              style={{ height: "50px" }}
            />
          </div>

          <div className={classes.inwrapper}>
            <label className={classes.label} htmlFor="Time">
              Time Complexity
            </label>
            <TextInput
              name="Time"
              id="Time"
              required
              className={classes.desc}
              width="small"
            >
              Time Complexity of problem
            </TextInput>
          </div>

          <div className={classes.inwrapper}>
            <label className={classes.label} htmlFor="space">
              Space Complexity
            </label>
            <TextInput
              name="space"
              id="space"
              required
              className={classes.desc}
              width="small"
            >
              Space Complexity of problem
            </TextInput>
          </div>

          {testCases.map((testCase, index) => (
            <div key={testCase.id} className={classes.testcase}>
              <label
                className={classes.testlabel}
                htmlFor={`Testcase${testCase.id}`}
              >
                {" "}
                {`Testcase ${testCase.id}`}{" "}
              </label>
              <input
                name="testcase"
                id={`Testcase${testCase.id}`}
                placeholder="Enter in one line"
                type="text"
                className={classes.testinput}
                required
                value={testCase.testcase}
                onChange={(event) => handleTestCaseChange(index, event)}
              />

              <label
                className={classes.testlabel}
                htmlFor={`Answer${testCase.id}`}
              >
                {" "}
                {`Answer ${testCase.id}`}{" "}
              </label>
              <input
                name="answer"
                id={`Answer${testCase.id}`}
                placeholder="Enter in one line"
                type="text"
                className={classes.testinput}
                required
                value={testCase.answer}
                onChange={(event) => handleTestCaseChange(index, event)}
              />

              <button
                type="button"
                onClick={() => deleteTestCase(index)}
                className={classes.deletebtn}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTestCase}
            className={classes.btnAdd}
          >
            + Add Test Case
          </button>

          {hints.map((hint, index) => (
            <div key={index} className={classes.hintcase}>
              <TextInput
                name={`hint${index}`}
                type="text"
                label={`Hint ${index + 1}`}
                value={hint}
                onChange={(event) => handleHintsChange(index, event)}
                style={{ width: "80%" }}
              >
                Enter Hint for the question
              </TextInput>
              <button
                type="button"
                onClick={() => deleteHints(index)}
                className={classes.deletebtn}
              >
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={addHints} className={classes.btnAdd}>
            + Add Hints
          </button>
        </div>

        <button className={classes.btn2} type="submit">
          {editing ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default QuestionForm;
