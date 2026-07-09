function add(a, b) {
    console.log(a + b);
    return a + b;
}

function subtract(a, b) {
    console.log(a - b);
    return a - b;
}

function multiply(a, b) {
    console.log(a * b);
    return a * b;
}

function divide(a, b) {
    console.log(a / b);
    return a / b;
} 

function operate(op, a, b) {
    if (op === "+") {
        return add(a, b);
    } else if (op === "-") {
        return subtract(a, b);
    } else if (op === "*") {
        return multiply(a, b);
    } else if (op === "/") {
        return divide(a, b);
    }
}

let prevNum = 0;
let operator = "";
let nextNum = 0;
let temp = "";
let answer = "";

//operate("*", 3, 5);

const display = document.querySelector("#display");
const allButtons = document.querySelectorAll("button");
const allNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const allSymbols = ["+", "-", "÷", "x"];
let equalClicked = false;

allButtons.forEach((button) => button.addEventListener("click", (event) => {
    const buttonValue = button.textContent;

    if (equalClicked === true && allNumbers.includes(buttonValue)) {
        display.value = "";
        temp = "";
        equalClicked = false;
    } else if (equalClicked === true && allSymbols.includes(buttonValue)) {
        temp = answer.toString();
        equalClicked = false;
    }

    if (allNumbers.includes(buttonValue)) {
        display.value += buttonValue;
        temp += buttonValue;

    } else if (allSymbols.includes(buttonValue)){
        prevNum = parseInt(temp);
        operator = button.id;
        display.value += `${buttonValue}`;
        temp = "";
    } else if (button.textContent === "=") {
        nextNum = parseInt(temp);
        answer = operate(operator, prevNum, nextNum);

        display.value = answer;
        equalClicked = true;
    }

    if (button.id === "clear") {
        display.value = "";
        answer = "";
        prevNum = 0;
        nextNum = 0;
        temp = "";
        equalClicked = false;
        return; 
    }

}));


