const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.btn');
let operand1 = '';
let operand2 = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;
        
        if (!isNaN(+buttonText)) {
            if (operator === '') {
                operand1 += buttonText;
                screen.value = operand1;
            } else {
                operand2 += buttonText;
                screen.value = operand2;
            }
        } else if (buttonText === 'AC') {
            screen.value = '0';
            operand1 = '';
            operand2 = '';
            operator = '';
        } else if (buttonText === '=') {
            if (operand1 !== '' && operand2 !== '') {
                const result = calculate(parseFloat(operand1), parseFloat(operand2), operator);
                screen.value = result.toString();
                operand1 = result.toString();
                operand2 = '';
                operator = '';
            }
        } else {
            operator = buttonText;
        }
    });
});

function calculate(num1, num2, op) {
    switch (op) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        case '%':
            return num1 % num2;
        default:
            return;
    }
}
