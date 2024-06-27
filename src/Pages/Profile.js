import React from 'react';
import classes from "./Profile.module.css";
import ProfileHeader from '../Components/ProfileHeader';
import ProfileBody from '../Components/ProfileBody';

const person = [
  {
      "name" : "Suprit Naik",
      "email" : "22CS01018@iitbbs.ac.in",
      "password":"pass@1233",
      "secretQuestion":"What is this",
      "secretAnswer":"This is it",
      "rollNumber":"22CS01018",
      "photo":"",
      "coverimg":"",
      "solved":[0,1],
      "github": "https://github.com/SNprime24",
      "leetcode":"https://leetcode.com/u/suprit/",
      "linkedin":"https://www.linkedin.com/in/suprit-naik-743a82178/",
      "codechef":"https://www.codechef.com/users/suprit",
      "codeforces":"https://codeforces.com/profile/Suprit"
  }  
]

const question = [
  {
      "title" : "Reverse a String",
      "description" : "Write a function that reverses a string.",
      "tags" : ["easy","string"],
      "testCase" : ["abs","bcd","aabaa","abcd","qwer"],
      "answer" : ["sba","dcb","aabaa","dcba","rewq"]
  },
  {
      "title" : "ODD or Even",
      "description" : "Write a program that take a input and tells wether input is odd or even.",
      "tags" : ["hard"],
      "testCase" : ["1","2","134","567","45244"],
      "answer" : ["ODD","EVEN","EVEN","ODD","EVEN"]
  },
  {
      "title" : "Sum of numbers in given range",
      "description" : "Write a function that takes two input and given the sum of numbers between them (both inclusive).",
      "tags" : ["medium","Number Theory"],
      "testCase" : ["1 2","1 5","10 15","1 10","1 1"],
      "answer" : ["3","15","75","55","1"]
  }
]

export default function Profile() {
  return (
    <div className={classes.wrapper}>
      <ProfileHeader profile={person}></ProfileHeader>
      <ProfileBody questions={question} solved_data={person[0].solved}></ProfileBody>
    </div>
  );
}