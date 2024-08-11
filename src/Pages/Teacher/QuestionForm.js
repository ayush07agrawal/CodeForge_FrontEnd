import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TextInput from "../../Components/Inputs/TextInput";
import classes from "./QuestionForm.module.css";
import { useSelector } from "react-redux";
import axios from 'axios';
import { server } from '../../Assests/config';
import toast from 'react-hot-toast';


const queDetails = {
    title: "hello",
    description: "lbvbvlwkg",
    difficulty: "hard",
    tags: ["array", "hksjfb"],
    testCase: ["sfdb", "bdfb", "bsdfb"],
    answer: ["bfdb", "sdbs", "fsdbs"],
    hints: ["wfbb", "wrwhhreh"],
    Time: "sdb",
    space: "dsbff",
    constraint: "sdbbe"
};

export default function QuestionForm() {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);
    const queDetails = location.state?.question;
    const labId = location.state?.labId;
    const questionId = location.state?.questionId;

    const editing = params.type === "edit";
    const newQ = params.type === "new";

    const testCasesAvailable = (
        !queDetails ?
            undefined :
            queDetails.testCase.map((item, idx) => ({ id: idx + 1, testCase: item, answer: queDetails.answer[idx] }))
    );

    const [questionArray, setQuestionArray] = useState([]);
    const [difficulty, setDifficulty] = useState(queDetails ? queDetails.difficulty : "");

    const [testCases, setTestCases] = useState((
        testCasesAvailable ?
            testCasesAvailable :
            [{ id: 1, testCase: "", answer: "" },])
    );

    const [hints, setHints] = useState((queDetails ? queDetails.hints : [""]));

    const addTestCase = () => {
        setTestCases([
            ...testCases,
            { id: testCases.length + 1, testCase: "", answer: "" },
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

    async function setLabHandler(event) {
        event.preventDefault();
        console.log(questionArray);
        const reqData = { labId, questionArray };
        try {
            const response = await axios.post(`${server}/api/v1/lab/updateLab`, reqData);
            if(response.status === 200) {
                toast.success("Lab updated successfully.");
                navigate('/app/lab');
            }
            else toast.error("Questions can't be added");
        }
        catch (error) {
            console.log(error);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const data = Object.fromEntries(fd.entries());
        let newData; 
        if(newQ) newData = { ...data, testCase: [], answer: [], hints: hints, teacherId: user._id };
        if(editing && !labId) newData = { ...data, testCase: [], answer: [], hints: hints, questionId: questionId };
        newData.tags = newData.tags.split(',')
        newData.tags = newData.tags.filter(( _, index ) => index !== 0)
        const updatedTags = [newData.difficulty, ...newData.tags];
        newData.tags = updatedTags;
        testCases.map((tc, ind) => {
            newData.testCase.push(tc.testCase)
            newData.answer.push(tc.answer)
        });
        const urlParam = (newQ) ? "createQuestion" : "updateQuestion";
        try {
            const response = await axios.post(`${server}/api/v1/question/${urlParam}`, newData);
            console.log(response);
            if (response.status === 200) {
                if(newQ) toast.success("Question added successfully");
                else toast.success("Question edited successfully");
                if(!labId) {
                    if(newQ) navigate('/app');
                    else navigate(`/app/question/${questionId}`);
                }
                else {
                    setQuestionArray((prev) => [
                        ...prev,
                        { 
                            id: response.data.data._id, 
                            tag: response.data.data.tags[0],
                            numTestCase: response.data.data.testCase.length
                        }
                      ]);
                }
            } 
            else { toast.error("Adding failed"); }
        } 
        catch (error) { toast.error("Adding failed"); }
    }

    return (
        <div className={classes.wrapper}>
            <form className={classes.form} onSubmit={handleSubmit}>
                <h1>{(editing ? "UPDATE" : "NEW") + " QUESTION"}</h1>
                <div className={classes.input}>
                    <TextInput
                        width="small"
                        name="title"
                        type="text"
                        label="Question Title"
                        defaultValue={queDetails ? queDetails.title : ""}
                        required
                    >
                        Enter the title of question...
                    </TextInput>

                    <TextInput
                        width="small"
                        name="tags"
                        type="text"
                        label="Topic Tags"
                        defaultValue={queDetails ? queDetails.tags : ""}
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
                            name="description"
                            id="description"
                            required
                            defaultValue={queDetails ? queDetails.description : ""}
                            className={classes.desc}
                        />
                    </div>

                    <div className={classes.inwrapper}>
                        <label className={classes.label} htmlFor="constraints">
                            Constraints
                        </label>
                        <textarea
                            name="constraints"
                            id="constraint"
                            defaultValue={queDetails ? queDetails.constraints : ""}
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
                            name="time"
                            id="Time"
                            required
                            defaultValue={queDetails ? queDetails.time : ""}
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
                            defaultValue={queDetails ? queDetails.space : ""}
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
                                name="testCase"
                                id={`Testcase${testCase.id}`}
                                placeholder="Enter in one line"
                                type="text"
                                className={classes.testinput}
                                required
                                value={testCase.testCase}
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
                            <label
                                className={classes.testlabel}
                                htmlFor={`hint${index}`}
                                style={{ width: "10%", marginTop: "9px" }}
                            >
                                {" "}{`Hint ${index + 1}`}{" "}
                            </label>

                            <input
                                name="hint"
                                id={`hint${index}`}
                                placeholder="Enter Hint for the question"
                                type="text"
                                className={classes.testinput}
                                required
                                value={hint}
                                onChange={(event) => handleHintsChange(index, event)}
                                style={{ width: "70%", marginRight: "15%" }}
                            />
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
                    {!labId ? (editing ? "Update" : "Submit") : "Add Question"}
                </button>
                {labId && <button className={classes.btn2} type="submit" onClick={setLabHandler}> Submit </button>}
            </form>
        </div>
    );
}