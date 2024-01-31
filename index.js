#!/usr/bin/env node
import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue("Welcome to the timer"));
const res = await inquirer.prompt({
    type: "number",
    name: "userInput",
    message: (chalk.green("Please enter the amount of second")),
    validate: (input) => {
        if (isNaN(input)) {
            return (chalk.red("Please enter vaild number"));
        }
        else if (input > 60) {
            return (chalk.magenta("Second must be in 60"));
        }
        else {
            return true;
        }
    }
});
let input = res.userInput;
function startTime(val) {
    const intTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(intTime);
    setInterval(() => {
        const currentTime = new Date();
        const timediff = differenceInSeconds(intervalTime, currentTime);
        if (timediff <= 0) {
            console.log(chalk.cyan("Timer has expired"));
            process.exit();
        }
        const min = Math.floor((timediff % (3600 * 24)) / 3600);
        const sec = Math.floor(timediff % 60);
        console.log(`${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
    }, 1000);
}
startTime(input);
