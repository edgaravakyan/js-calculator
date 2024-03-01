const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');

const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => (b === 0 ? "0 is an invalid value" : a / b),
};

const actions = {
    'AC': () => {
        currentNumber = '';
        firstOperand = null;
        operator = null;
        screen.value = '0';
    },
    '+/-': () => {
        currentNumber = (parseFloat(currentNumber) * -1).toString();
        screen.value = currentNumber;
    },
    '%': () => {
        currentNumber = (parseFloat(currentNumber) / 100).toString();
        screen.value = currentNumber;
    },
    '=': () => {
        if (firstOperand !== null && operator) {
            const result = operations[operator](firstOperand, parseFloat(currentNumber));
            screen.value = result;
            currentNumber = result.toString();
            firstOperand = null;
            operator = null;
        }
    }
};

let currentNumber = '';
let firstOperand = null;
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;
        if (!isNaN(buttonText) || buttonText === '.') {
            currentNumber += buttonText;
            screen.value = currentNumber;
        } else if (buttonText in operations) {
            if (currentNumber !== '') {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentNumber);
                } else if (operator) {
                    const result = operations[operator](firstOperand, parseFloat(currentNumber));
                    screen.value = result;
                    firstOperand = result;
                }
                operator = buttonText;
                currentNumber = '';
            }
        } else if (buttonText in actions) {
            actions[buttonText]();
        }
    });
});
