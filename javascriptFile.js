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

function countTotalDigits(num) {
    const strNum = num.toString();
    if (strNum.includes(".")) {
        return strNum.length - 1;
    } 

    return strNum.length;
}

// function roundToSignificantDigits(value, digits = 10) {
//   if (value === 0) return 0;
//   // Use toPrecision for rounding logic, then parse back to number
//   return Number(parseFloat(value.toPrecision(digits)));
// }

function formatFixedWidth(value, totalLength = 11) {
  // Convert to string to preserve all characters
  let str = value.toString();
  
  // If the number is too long, truncate or round as needed
  if (str.length > totalLength) {
    // Fallback: just slice or use toPrecision if you prefer rounding
    return str.slice(0, totalLength); 
  }
  return str;
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
const allNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const allSymbols = ["+", "-", "÷", "x"];
let equalClicked = false;
let decimalPoint = false;

document.addEventListener("keydown", (event) => {
    const keyMap = {
        "Enter": "#calculate",
        "Escape": "#clear",
        "Backspace": "#backspace",
        "*": "x",
        "/": "÷"
    };

    let searchTarget = event.key;

    if(keyMap[searchTarget]) {
        searchTarget = keyMap[searchTarget];
    }

    let matchingButton;

    if (searchTarget.startsWith("#")) {
        matchingButton = document.querySelector(searchTarget);
    } else {
        matchingButton = Array.from(document.querySelectorAll("button")).find(
            (button) => button.textContent === searchTarget
        );
    }

    if (matchingButton) {
        event.preventDefault();
        matchingButton.click();
    }
});

allButtons.forEach((button) => button.addEventListener("click", (event) => {
    let buttonValue = button.textContent;

    if (button.id === "clear") {
        display.value = "";
        answer = "";
        prevNum = 0;
        nextNum = 0;
        temp = "";
        equalClicked = false;
        decimalPoint = false;
        return; 
    }

    if (button.id === "backspace") {
        if (temp.endsWith(".")) {
            decimalPoint = false;
        }
        temp = temp.slice(0,-1);
        display.value = display.value.slice(0,-1);
        return;
    }

    if (equalClicked === true && allNumbers.includes(buttonValue)) {
        display.value = "";
        temp = "";
        equalClicked = false;
    } else if (equalClicked === true && allSymbols.includes(buttonValue)) {
        temp = answer.toString();
        equalClicked = false;
    }

    if (allNumbers.includes(buttonValue)) {
        if (buttonValue === ".") {
            if (decimalPoint === true) {
                buttonValue = "";
            } else {
                decimalPoint = true;
            }   
        }

        display.value += buttonValue;
        temp += buttonValue;
        

    } else if (allSymbols.includes(buttonValue)){
        prevNum = parseFloat(temp);
        decimalPoint = false;
        operator = button.id;
        display.value += `${buttonValue}`;
        temp = "";

    } else if (button.textContent === "=") {

        if (!operator) {
            return;
        }

        nextNum = parseFloat(temp);
        decimalPoint = false;
        answer = operate(operator, prevNum, nextNum);
        if (countTotalDigits(answer) > 10) {
            display.value = formatFixedWidth(answer);
        } else {
            display.value = answer;
        }
        equalClicked = true;
    }

}));


