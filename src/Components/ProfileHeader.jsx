import React from 'react';
import classes from "./ProfileHeader.module.css";
import cover from "../Assests/background.png";
import pphoto from "../Assests/profilephoto.png";
import emailicon from "../Assests/email.svg";
import githubicon from "../Assests/github.svg";
import linkednicon from"../Assests/linkedin.svg";
import codecheficon from"../Assests/codechef.png";
import codeforcesicon from"../Assests/codeforces.svg";
import leetcodeicon from"../Assests/leetcode.png";

const ProfileHeader = ({profile})=>{
    return(
        <div className={classes.wrapper}>
            <div className={classes.cover}>
                <img src={profile.coverimg===""?cover:profile.coverimg} alt=""></img>
                <div className={classes.profilephoto}>
                    <img src={profile.photo===""?pphoto:profile.photo} alt=""></img>
                </div>
            </div>
            <div className={classes.downcover}>
                <p className={classes.profilename}>{profile.name}</p>
                <p className={classes.profileroll}>{profile.rollNumber}</p>
                <div className={classes.profilelinks}>
                    <a href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">
                        <img src={emailicon} alt="email" className={classes.iconlinks} style={profile.email===""?{display:'none'}:{}}/>
                    </a>
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                        <img src={githubicon} alt="github" className={classes.iconlinks} style={profile.github===""?{display:'none'}:{}}/>
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                        <img src={linkednicon} alt="linkedn" className={classes.iconlinks} style={profile.linkedin===""?{display:'none'}:{}}/>
                    </a>
                    <a href={profile.codeforces} target="_blank" rel="noopener noreferrer">
                        <img src={codeforcesicon} alt="codeforces" className={classes.iconlinks} style={profile.codeforces===""?{display:'none'}:{}}/>
                    </a>
                    <a href={profile.codechef} target="_blank" rel="noopener noreferrer">
                        <img src={codecheficon} alt="codechef" className={classes.iconlinks} style={profile.codechef===""?{display:'none'}:{}}/>
                    </a>
                    <a href={profile.leetcode} target="_blank" rel="noopener noreferrer">
                        <img src={leetcodeicon} alt="leetcode" className={classes.iconlinks} style={profile.leetcode===""?{display:'none'}:{}}/>
                    </a>                    
                </div>
            </div>            
        </div>
    );
}
export default ProfileHeader;
