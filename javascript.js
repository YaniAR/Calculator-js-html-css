const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

let num1 = null;
let op = null;
let num2 = null;
let res = null;
let currentOP = null;

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const percentage = (a) => a / 100;

function clearDisplay() {
    display.textContent = "0";
    num1 = null;
    op = null;
    num2 = null;
    if (currentOP) currentOP.style.border = "";
    currentOP = null;
}

function inputOperand(operand) {
    if (display.textContent === '0' || display.textContent === 'NaN' || display.textContent == num1) {
        display.textContent = operand;
    } else {
        display.textContent += operand;
    }
}

function inputOperator(operator) {
    if (currentOP) currentOP.style.border = "";
    if (num1 !== null && op !== null) inputEquals();
    num1 = +display.textContent;
    op = operator;
}

function inputEquals() {
    if (num1 !== null && op !== null) {
        num2 = +display.textContent;
        display.textContent = operate();
        num1 = +display.textContent;
        op = null;
    }
    if (currentOP) currentOP.style.border = "";
}

function operate() {
    res = NaN;
    switch (op) {
        case '*':
            res = multiply(num1, num2);
            break;
        case '/':
            res = divide(num1, num2);
            break;
        case '+':
            res = add(num1, num2);
            break;
        case '-':
            res = subtract(num1, num2);
            break;
        default:
    }
    return roundAccurately(res, 15);
}

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("clear")) {
            clearDisplay();
        } else if (button.classList.contains("percent")) {
            display.textContent = percentage(+display.textContent);
        } else if (button.classList.contains("sign")) {
            display.textContent = display.textContent.charAt(0) === '-' ? display.textContent.substring(1) : '-' + display.textContent;
        } else if (button.classList.contains("operator")) {
            inputOperator(button.textContent);
            currentOP = button;
            button.style.border = "2px solid gold";
        } else if (button.classList.contains("equals")) {
            inputEquals();
        } else {
            inputOperand(button.textContent);
        }
    });
});

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}