#!/usr/bin/env node

import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";

const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: "Please Enter the amount of seconds",
    validate: (input) =>{
        if (isNaN(input)){
            return "Please enter a valid number";
        } else if(input > 60){
            return "Seconds must be less than or equal to 60";
        } else {
            return true;
        }
    }
});

const input = res.userInput;

function startTime(val: number){
    const intervalTime = new Date(new Date().setSeconds(new Date().getSeconds() + val));
    const intervalId = setInterval(() =>{
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if(timeDiff <= 0){
            console.log('Time has Expired'); 
            clearInterval(intervalId);
        } else {
            const min = Math.floor((timeDiff % (3600 * 24)) / 60);
            const sec = Math.floor(timeDiff % 60);
            console.log( `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
        }
    }, 1000);
}

startTime(input);