import React from "react";
import classes from "./Lab.module.css";
import { useSelector } from "react-redux";
import DropdownSubmission from "../Components/DropdownSubmission";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { useErrors } from "../hooks/hooks";
import { useGetLabsQuery } from "../redux/api/api";

export default function Lab() {
  const user = useSelector((state) => state.auth.user);
  const batch = user.batch;
  const { data, isLoading, isError, error } = useGetLabsQuery(batch);
  useErrors([{ isError, error }]);
  console.log(data);
  const labs = data?.lab;
  return (
    <div className={classes.wrapper}>
      <div className={classes.header}>
        <h2>
          <strong>Batch: </strong>
          <i>{user.batch}</i>
        </h2>
      </div>
      <div className={classes.labs}>
        {isLoading
          ? "Loading..."
          : labs?.map((item, idx) => (
              <DropdownSubmission
                heading={item.topic + " " + item.duration}
                date={item.date}
                key={uuid()}
              >
                <ul className={classes.queList}>
                  {item.questions.map((problem, idx) => (
                    <li key={idx} className={classes.listItem}>
                      <Link
                        to={"/app/question/" + problem}
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