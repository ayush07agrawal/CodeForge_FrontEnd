import React from "react";
import classes from "./FrontPage.module.css";
import image from "../Assests/Frame1.jpg";
import {Link} from "react-router-dom";

function FrontPage() {
  return (
    <div className={classes.wrapper}>
        <div className={classes.heading}>
          <img className={classes.img} src={image} alt="Logo" />
          <p className={classes.desc}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            reprehenderit, hic recusandae repudiandae nostrum laudantium, autem
            sed obcaecati dolor facilis cumque consequatur error nobis iusto
            veritatis iste consectetur? Nam, error?
          </p>
          <Link to="auth/verifyEmail">
            <button className={classes.btn}>Get Started</button>
          </Link>
        </div>
    </div>
  );
}

export default FrontPage;
