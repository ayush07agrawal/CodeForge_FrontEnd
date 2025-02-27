import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import classes from "./CodeEditor.module.css";
import SelectInput from './Inputs/SelectInput';
import { Form, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useRunQuestionMutation, useSubmitQuestionMutation } from '../redux/api/api';

const sizeValues = [8, 9, 10, 12, 14, 16, 18, 20, 22, 24, 26];
const languages = ["cpp", "c"];
const langVersions = ["GCC 11.1.0", "GCC 13.2.1"];
const themes = ["vs-dark", "vs-light"];

export default function CodeEditor({ testCase, labId }) {
    const params = useParams();
    const { user } = useSelector((state) => state.auth);
    const [editor, setEditor] = useState({
        language: "cpp",
        languageVersion: "GCC 11.1.0",
        theme: "vs-dark",
        size: 16,
        wrapOn: "Wrap",
        code: "// Write your code here...",
    });
    const [stdin, setStdin] = useState(testCase?.reduce((final, val) => final + val + "\n", testCase.length + "\n"));
    const [customInput, setCustomInput] = useState(false);
    const [output, setOutput] = useState(false);
    const [response, setResponse] = useState(undefined);
    const [runQuestion] = useRunQuestionMutation();
    const [submitQuestion] = useSubmitQuestionMutation();

    function handleCode(value) {
        setEditor((prev) => {
            return {
                ...prev,
                code: value,
            };
        });
    }
    function handleChange(event) {
        setEditor((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            };
        });
    }
    function handleStdin(event) {
        setStdin(event.target.value);
    }

    function createRequest({ isSubmission = false }) {
        const request = {
            userId: user._id,
            language: editor.language,
            versionIndex: editor.languageVersion === "GCC 11.1.0" ? 5 : 6,
            script: editor.code.replace(/\\r\\/g, "\\"),
        };
        
        if(isSubmission) request.labId = labId || "";
        else request.stdin = stdin.replace(/\n/g, " ");
    
        return request;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const destination = (labId.length > 0) ? "lab" : "question";
        setResponse(undefined);
        setOutput(true);
        try {
            const submitRequest = createRequest({ isSubmission: true });
            
            const submitResponse = await submitQuestion({ destination, questionId : params.questionId, request: submitRequest });
            if (!submitResponse.data.success) {
                throw new Error("Error submitting code.");
            }
            setResponse(submitResponse.data);
        } 
        catch (error) {
            console.error("Error submitting code:", error);
            setResponse({ message: "Error submitting code." });
        }
    }

    async function handleRun(event){
        event.preventDefault();
        setOutput(true);
        try {
            const runRequest = createRequest({ isSubmission: false });

            const response = await runQuestion({ questionId : params.questionId, request: runRequest });
            if (!response.data.success) {
                throw new Error("Error running code.");
            }
            const resData = await response.data;
            setResponse(resData.data);
        } 
        catch (error) {
            console.error("Error running code:", error);
            setResponse({ message: "Error running code." });
        }
    }

    return (
        <Form onSubmit={handleSubmit} className={classes.wrapper}>
            <div className={classes.controls}>
                <div>
                    <SelectInput name="language" values={languages} handleChange={handleChange} />
                    <SelectInput name="languageVersion" values={langVersions} handleChange={handleChange} />
                </div>
                <div>
                    <SelectInput name="theme" values={themes} handleChange={handleChange} />
                    <SelectInput name="size" values={sizeValues} handleChange={handleChange} />
                    <SelectInput name="wrapOn" values={["Wrap", "No-Wrap"]} handleChange={handleChange} />
                </div>
            </div>
            <main>
                {customInput &&
                    <div className={classes.textArea}>
                        <h2 className={classes.textAreaH2}>CUSTOM INPUT</h2>
                        <textarea
                            value={stdin}
                            onChange={handleStdin}
                            placeholder="Enter your custom input here..."
                        />
                    </div>
                }
                {output &&
                    <div className={classes.textArea}>
                        {response ? (
                            <>
                                {
                                    !response.output &&
                                    <h2 className={classes.textAreaH2}>
                                        {response.success ? "Submission Successful" : "Failed"}<br /> {response.message}
                                    </h2>
                                }
                                {
                                    response.output &&
                                    <h2 className={classes.textAreaH2}>
                                        OUTPUT
                                    </h2>
                                }
                                {response.output &&
                                    <p>
                                        {response.output}
                                        <br />
                                        Time Taken : {response.cpuTime}
                                        <br />
                                        Memory Used : {response.memory}
                                    </p>
                                }
                            </>
                        ) : "Submitting..."}
                        <div style={{ display: "flex", flexDirection: "column", flexGrow: 0.5 }} />
                        <button onClick={() =>{
                            setOutput(false);
                            setResponse(undefined);
                        }}>Back</button>
                    </div>
                }
                <Editor
                    className={classes["monaco-editor"]}
                    value={editor.code}
                    onChange={(value) => handleCode(value)}
                    height="84vh"
                    width="60vw"
                    theme={editor.theme}
                    options={{
                        TextEditorCursorStyle: "Underline",
                        fontSize: editor.size,
                        fontFamily: "Consolas",
                        fontWeight: "normal",
                        tabSize: "10",
                        insertSpaces: true,
                        lineHeight: ((1.3) * editor.size),
                        wordWrap: (editor.wrapOn === "Wrap"),
                        scrollbar: {
                            vertical: "auto",
                            horizontal: "auto",
                            verticalScrollbarSize: 15,
                            horizontalScrollbarSize: 15,
                        },
                    }}
                />
            </main>
            <div className={classes.submission}>
                <button onClick={() => setCustomInput((prev) => !prev)} type="button">{customInput ? "Editor" : "Custom Input"}</button>
                <button type="button" onClick={handleRun}> Run </button>
                <button >Submit</button>
            </div>
        </Form>
    );
}