const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator_key");
const display = document.querySelector('.calculator_display');

let waitingForSecondValue = false;

calculator.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;

    if (!action) {
        handleInput(keyContent);
    } else if (action === 'tambah' || action === 'kurang' || action === 'kali' || action === 'bagi') {
        handleInput(' ' + keyContent + ' ');
    } else if (action === 'decimal') {
        handleInput('.');
    } else if (action === 'clear') {
        clearCalculator();
    } else if (action === 'calculate') {
        calculate();
    }

    updateDisplay(display.textContent);
});

function handleInput(input) {
    if (display.textContent === '0' || waitingForSecondValue) {
        display.textContent = input;
        waitingForSecondValue = false;
    } else {
        display.textContent += input;
    }
}

function updateDisplay(expression) {
    display.textContent = expression;
}

function clearCalculator() {
    display.textContent = '0';
    waitingForSecondValue = false;
}

function calculate() {
    try {
        const result = eval(display.textContent); // buat menghitung text content dari steing kaya 1+1*2 etc
        display.textContent = parseFloat(result.toFixed(7));
    } catch (error) {
        display.textContent = 'Error';
    }
}