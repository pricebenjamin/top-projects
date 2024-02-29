let DEBUG_MODE = false;

document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.querySelector('#root');
    const buttons = document.querySelectorAll('.button');

    appRoot.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keyboardHandler);
    document.addEventListener('keydown', simulateHover);

    function clickHandler(event) {
        const target = event.target;
        if (!target.classList.contains('button')) return;
        updateCalculatorState(target);
        updateUserInterface();
    }

    function keyboardHandler(event) {
        const btn = buttonFilter(event);
        if (!btn) return;

        // redirect to click handler
        btn.click();
    }

    const buttonTimers = {};
    const SIMULATED_HOVER_DELAY_MS = 100;

    function simulateHover(event) {
        const btn = buttonFilter(event);
        if (!btn) return;

        btn.classList.add('hover');
        if (buttonTimers[event.key]) {
            clearTimeout(buttonTimers[event.key]);
        }
        buttonTimers[event.key] = setTimeout(() => {
            btn.classList.remove('hover');
        }, SIMULATED_HOVER_DELAY_MS);
    }

    function buttonFilter(event) {
        const keyMap = {
            'c': 'C',
            'Backspace': '←',
            '/': '÷',
            'x': '×',
            '*': '×',
            'Enter': '=',
        };

        return findButtonByTextContent(keyMap[event.key] ?? event.key);
    }

    function findButtonByTextContent(content) {
        for (const btn of buttons) {
            if (btn.textContent == content) {
                return btn;
            }
        }
        return null;
    }

    const calculatorState = {
        operandLeft: [],
        operandRight: [],
        operation: '',
        isFinished: false,
    };

    function updateCalculatorState(btn) {
        if (isNumeric(btn)) {
            updateCalculatorOperands(btn.textContent);
        }

        if (isOperator(btn)) {
            applyOperatorToCalculatorState(btn.textContent);
        }

        if (DEBUG_MODE) {
            console.table({
                isFinished: calculatorState.isFinished,
                left: calculatorState.operandLeft.join(''),
                operator: calculatorState.operation,
                right: calculatorState.operandRight.join(''),
            });
        }
    }

    const MAX_OPERAND_LENGTH = 12;

    function updateCalculatorOperands(char) {
        if (calculatorState.isFinished) {
            clearCalculatorState();
        }

        let operand = getActiveOperand();
        if (char == '.' && operand.includes('.')) {
            // do not allow more than one decimal point
            return;
        }

        if (char == '.' && operand.length == 0) {
            // leading char should not be '.'
            operand.push('0');
        }

        if (operand.join('') == '0' && char != '.') {
            // only allow leading zero on decimal
            operand.pop();
        }

        if (operand.length == MAX_OPERAND_LENGTH) {
            return;
        }

        operand.push(char);
    }

    function getActiveOperand() {
        return (
            calculatorState.operation == '' ?
                calculatorState.operandLeft :
                calculatorState.operandRight
        );
    }

    function isNumeric(btn) {
        return btn.classList.contains('numeric');
    }

    function applyOperatorToCalculatorState(opChar) {
        const operations = {
            'C': clearCalculatorState,
            '←': applyBackspace,
            '=': calculate,
            '+': applyOperation,
            '-': applyOperation,
            '÷': applyOperation,
            '×': applyOperation,
        };
        operations[opChar]?.(opChar);
    }

    function clearCalculatorState() {
        calculatorState.operandLeft = [];
        calculatorState.operandRight = [];
        calculatorState.operation = '';
        calculatorState.isFinished = false;
    }

    function applyBackspace() {
        if (calculatorState.isFinished) {
            clearCalculatorState();
        }
        const operand = getActiveOperand();
        operand.pop();
    }

    function calculate() {
        if (calculatorState.operandLeft.length == 0) return;
        if (calculatorState.operandRight.length == 0) return;
        if (calculatorState.operation == '') return;

        const a = Number(calculatorState.operandLeft.join(''));
        const b = Number(calculatorState.operandRight.join(''));
        
        const opLookup = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '×': (a, b) => a * b,
            '÷': (a, b) => a / b,
        };

        const result = opLookup[calculatorState.operation](a, b);
        const resultStr = createStringToFitDisplay(result);

        clearCalculatorState();
        calculatorState.operandLeft = resultStr.split('');
        calculatorState.isFinished = true;
    }

    function createStringToFitDisplay(result) {
        let resultStr = result.toString();

        if (resultStr.length > MAX_OPERAND_LENGTH) {
            resultStr = result.toExponential(MAX_OPERAND_LENGTH);

            const overflow = resultStr.length - MAX_OPERAND_LENGTH;
            if (overflow > 0) {
                resultStr = result.toExponential(MAX_OPERAND_LENGTH - overflow);
            }
        }

        return resultStr;
    }

    function applyOperation(opChar) {
        if (calculatorState.operation) {
            calculate();
        }
        if (calculatorState.operandLeft.length != 0) {
            calculatorState.operation = opChar;
            calculatorState.isFinished = false;
        }
    }

    function isOperator(btn) {
        return btn.classList.contains('operator');
    }

    function updateUserInterface() {
        updateDisplay();
    }

    const OPERAND_PLACEHOLDER_TEXT = ' ';
    const lowerDisplay = appRoot.querySelector('#display>#lower');
    const upperDisplay = appRoot.querySelector('#display>#upper');

    function updateDisplay() {
        const a = calculatorState.operandLeft.join('');
        const b = calculatorState.operandRight.join('');
        const operator = calculatorState.operation;

        if (operator) {
            upperDisplay.textContent = `${a} ${operator}`
            lowerDisplay.textContent = nonempty(b);
        } else {
            upperDisplay.textContent = nonempty('');
            lowerDisplay.textContent = nonempty(a);
        }

        function nonempty(str) {
            return str == '' ? OPERAND_PLACEHOLDER_TEXT : str;
        }
    }

});
