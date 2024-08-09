import React from "react";
import classes from "./Lab.module.css";
import { useSelector } from "react-redux";
import DropdownSubmission from "../Components/DropdownSubmission";
import { v4 as uuid } from "uuid";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useErrors } from "../hooks/hooks";
import { useGetLabsQuery } from "../redux/api/api";

export default function Lab() {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const user = useSelector((state) => state.auth.user);
	const batch = user.role === "teacher" ? searchParams.get("batch") : user.batch;
	const { data, isLoading, isError, error } = useGetLabsQuery(batch);
	useErrors([{ isError, error }]);
	const labs = data?.lab;
	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>
				<h2>
					<strong>Batch: </strong>
					<i>{batch}</i>
				</h2>
				{user.role === "teacher" && (
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
								timeLeft={(item.isStart && !item.isEnd) ? item.duration : undefined}
								date={item.date}
								labId={item._id}
								isStart={item.isStart}
								isEnd={item.isEnd}
								key={uuid()}
							>
								<ul className={classes.queList}>
									{item.questions.map((problem, idx) => (
										<li
											key={idx}
											className={classes.listItem}
										>
											<Link
												to={{
													pathname: `/app/question/${problem}`,
													state: { labId: labs._id },
												}}
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
		</div>
	);
}