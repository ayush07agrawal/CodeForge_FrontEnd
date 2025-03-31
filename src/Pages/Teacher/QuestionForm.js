import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./QuestionForm.module.css";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useUpdateLabMutation, useSubmitInQuestionFormMutation } from "../../redux/api/api";
import { useAsyncMutation } from "../../hooks/hooks";

export default function QuestionForm() {
	const params = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const user = useSelector((state) => state.auth.user);
	const queDetails = location.state?.question;
	const labId = location.state?.labId;
	const batch = location.state?.batch;
	const questionId = location.state?.questionId;

	const [updateLab, isLoading] = useAsyncMutation(useUpdateLabMutation);
	const [submitQuestion] = useSubmitInQuestionFormMutation();

	const editing = params.type === "edit";
	const newQ = params.type === "new";

	const testCasesAvailable = !queDetails
		? undefined
		: queDetails.testCase.map((item, idx) => ({ id: idx + 1, testCase: item, answer: queDetails.answer[idx] }));

	const [questionArray, setQuestionArray] = useState([]);
	const [difficulty, setDifficulty] = useState(queDetails ? queDetails.difficulty : "");

	const [testCases, setTestCases] = useState(
		testCasesAvailable ? testCasesAvailable : [{ id: 1, testCase: "", answer: "" }]
	);

	const [hints, setHints] = useState(queDetails ? queDetails.hints : [""]);

	const addTestCase = () => {
		setTestCases([...testCases, { id: testCases.length + 1, testCase: "", answer: "" }]);
	};

	const handleTestCaseChange = (index, event) => {
		console.log(event);
		const newTestCases = [...testCases];
		newTestCases[index][event.target.name] = event.target.value;
		setTestCases(newTestCases);
		console.log(testCases); //for testing purposes
	};

	const deleteTestCase = (index) => {
		const newTestCases = testCases.filter((value, i) => i !== index).map((tc, idx) => ({ ...tc, id: idx + 1 }));
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
		const reqData = { labId, questionArray };
		console.log(reqData);
		updateLab("Updating lab...", reqData);
		if (!isLoading) {
			navigate(`/app/lab?batch=${batch}`);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const fd = new FormData(event.target);
		const data = Object.fromEntries(fd.entries());

		let newData;
		if (newQ) newData = { ...data, testCase: [], answer: [], hints: hints, teacherId: user._id, labId };
		if (editing && !labId) newData = { ...data, testCase: [], answer: [], hints: hints, questionId: questionId };
		newData.tags = newData.tags.split(",");
		newData.tags = newData.tags.filter(
			(value, index) => value !== "easy" && value !== "medium" && value !== "hard"
		);

		const updatedTags = [newData.difficulty, ...newData.tags];
		newData.tags = updatedTags;
		testCases.forEach((tc) => {
			newData.testCase.push(tc.testCase);
			newData.answer.push(tc.answer);
		});
		const urlParam = newQ ? "createQuestion" : "updateQuestion";

		try {
			console.log(newData);
			const response = await submitQuestion({ urlParam, newData }).unwrap();
			console.log(response);

			if (response.success) {
				if (newQ) toast.success("Question added successfully");
				else toast.success("Question edited successfully");

				if (!labId) {
					if (newQ) navigate("/app");
					else navigate(`/app/question/${questionId}`);
				} else {
					setQuestionArray((prev) => [
						...prev,
						{
							id: response.data._id,
							tag: response.data.tags[0],
							numTestCase: response.data.testCase.length,
						},
					]);
				}
			}
			else {
				toast.error("Adding failed1");
			}
		} catch (error) {
			toast.error("Adding failed");
		}
	}

	return (
		<div className={classes.wrapper}>
			<div className={classes.goBack}>
				<p onClick={() => navigate(-1)}>
					x
				</p>
			</div>
			<form className={classes.form} onSubmit={handleSubmit}>
				<h1>{(editing ? "UPDATE" : "NEW") + " QUESTION"}</h1>
				<div className={classes.inputFields}>
					<div className={classes.first}>
						<div className={classes.intro}>
							<div className={classes.title}>
								<label className={classes.label} htmlFor="title">
									Question Title
								</label>
								<input
									type="text"
									name="title"
									id="title"
									placeholder="Enter the title of question..."
									className={`${classes.input} ${classes.medium}`}
									defaultValue={queDetails ? queDetails.title : ""}
									required
								/>
							</div>
							<div className={classes.tags}>
								<label className={classes.label} htmlFor="tags">
									Topic Tags
								</label>
								<input
									type="text"
									name="tags"
									id="tags"
									placeholder="Enter the topic tags... (Eg: Arrays,Tree...)"
									className={`${classes.input} ${classes.medium}`}
									defaultValue={queDetails ? queDetails.tags : ""}
									required
								/>
							</div>

							<div className={`${classes.rowSmall} ${classes.medium}`}>
								<div className={classes.difficulty}>
									<label className={classes.label} htmlFor="difficulty">
										Difficulty
									</label>
									<select
										name="difficulty"
										id="difficulty"
										onChange={(event) => setDifficulty(event.target.value)}
										className={`${classes.select} ${classes.small}`}
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

								<div className={classes.timeComplexity}>
									<label className={classes.label} htmlFor="time">
										Time Limit
									</label>
									<input
										type="text"
										name="time"
										id="time"
										placeholder="In secs.."
										className={`${classes.input} ${classes.small}`}
										defaultValue={queDetails ? queDetails.time : ""}
										required
									/>
								</div>

								<div className={classes.spaceComplexity}>
									<label className={classes.label} htmlFor="space">
										Space Limit
									</label>
									<input
										type="text"
										name="space"
										id="space"
										placeholder="In MB.."
										className={`${classes.input} ${classes.small}`}
										defaultValue={queDetails ? queDetails.space : ""}
										required
									/>
								</div>
							</div>
						</div>

						<div className={`${classes.description} ${classes.medium}`}>
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

					{testCases.map((testCase, index) => (
						<div key={testCase.id} className={classes.testcase}>
							<label className={classes.testlabel} htmlFor={`Testcase${testCase.id}`}>
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

							<label className={classes.testlabel} htmlFor={`Answer${testCase.id}`}>
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

							<button type="button" onClick={() => deleteTestCase(index)} className={classes.deletebtn}>
								Delete
							</button>
						</div>
					))}
					<button type="button" onClick={addTestCase} className={classes.btnAdd}>
						+ Add Test Case
					</button>

					{hints.map((hint, index) => (
						<div key={index} className={classes.hintcase}>
							<label
								className={classes.testlabel}
								htmlFor={`hint${index}`}
								style={{ width: "10%", marginTop: "9px" }}
							>
								{" "}
								{`Hint ${index + 1}`}{" "}
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
							<button type="button" onClick={() => deleteHints(index)} className={classes.deletebtn}>
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
				{labId && (
					<button className={classes.btn2} type="submit" onClick={setLabHandler}>
						{" "}
						Submit{" "}
					</button>
				)}
			</form>
		</div>
	);
}
