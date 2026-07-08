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
    } else {
        console.log("Please enter the appropriate operator")
    }
}

let prevNum = 0;
let operator = "";
let nextNum = 0;

//operate("*", 3, 5);

const display = document.querySelector("#display");
const allButtons = document.querySelectorAll("button");
const allNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const allSymbols = ["+", "-", "÷", "x"];
let equalClicked = false;

allButtons.forEach((button) => button.addEventListener("click", (event) => {
    const buttonValue = button.textContent;

    if (equalClicked === true) {
        display.value = "";
        equalClicked = false;
    }

    if (allNumbers.includes(buttonValue)) {
        display.value += buttonValue;
    } 
    
    if (allSymbols.includes(buttonValue)){
        prevNum = parseInt(display.value);
        operator = `${button.id}`;
        display.value += buttonValue;
    }

    if (button.textContent === "=") {
        nextNum = parseInt(display.value);
        display.value = operate(operator, prevNum, nextNum);
        equalClicked = true;
    }

    if (button.id === "clear") {
        display.value = "";
    }



}));


