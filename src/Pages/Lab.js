import React, { useState } from "react";
import classes from "./Lab.module.css";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useErrors } from "../hooks/hooks";
import { useGetBatchQuery, useGetLabsQuery } from "../redux/api/api";
import DropdownSubmission from "../Components/DropdownSubmission";
import Performance from "../Components/Performance";

export default function Lab() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();

	const user = useSelector((state) => state.auth.user);
	const batch = user.role === "teacher" ? searchParams.get("batch") : user.batch;

	const [showPerformance, setShowPerformance] = useState(false);
	const [showBatchPerformance, setShowBatchPerformance] = useState(false);
	const [lab, setLab] = useState({});

	const { data: bdata, isError: isBatchError, error: batchError } = useGetBatchQuery(batch);
	const { data: ldata, isLoading, isError: isLabError, error: labError } = useGetLabsQuery(batch);
	useErrors([{ isBatchError, batchError }]);
	useErrors([{ isLabError, labError }]);

	const labs = ldata?.lab;
	const batchReport = bdata?.batch.report;

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<h2>
					<strong>Batch: </strong>
					<i>{batch}</i>
				</h2>
				{user.role === "teacher" && (
					<div>
						<button onClick={() => setShowBatchPerformance(true)}>Batch Performance</button>
						<button
							className={classes.createLab}
							onClick={() =>
								navigate("/app/createlab", {
									state: { batch: batch },
								})
							}
						>
							Create Lab
						</button>
					</div>
				)}
			</div>
			<div className={classes.labs}>
				{isLoading
					? "Loading..."
					: labs?.map((item, idx) => (
							<DropdownSubmission
								heading={
									item.topic +
									" " +
									(item.isEnd ? (
										"(Completed)"
									) : item.isStart ? (
										""
									) : (
										"( " +
										Math.floor(item.duration / 3600) +
										":" +
										(Math.floor(item.duration / 60) % 60) +
										":" +
										(item.duration % 60) +
										")"
									))
								}
								lab = {item}
								key = {uuid()}
								setLab = {setLab}
								handleShowPerformance = {setShowPerformance}
							>
								<ul className={classes.queList}>
									{item.questions.map((problem, idx) => (
										<li
											key={idx}
											className={classes.listItem}
										>
											<Link
												to = {`/app/question/${problem.id}`}
												state = {{ labId: item._id }}
												className={classes.quesLinks}
											>
												Question {idx + 1}
											</Link>
										</li>
									))}
								</ul>
							</DropdownSubmission>
					  ))}
			</div>
			<div>
				{showPerformance && 
					<Performance 
						show = {showPerformance} 
						handleShowPerformance = {setShowPerformance} 
						labId = {lab._id}
						report = {lab.report} 
						labQuestions = {lab.questions}
					/>
				}
				{showBatchPerformance && 
					<Performance 
						show = {showBatchPerformance} 
						handleShowPerformance = {setShowBatchPerformance} 
						report = {batchReport}
						totalLabs = {bdata?.batch.labs.length}
						batch = {true}
					/>
				}
			</div>
		</div>
	);
}