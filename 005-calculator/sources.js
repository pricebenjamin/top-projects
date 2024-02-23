document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.querySelector('#root');
    const buttons = document.querySelectorAll('.button');

    appRoot.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keyboardHandler);
    document.addEventListener('keydown', simulateHover);
    document.addEventListener('keyup', simulateHover);

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

    function simulateHover(event) {
        const btn = buttonFilter(event);
        if (!btn) return;
        if (event.type == 'keydown') {
            btn.classList.add('hover');
        } else if (event.type == 'keyup') {
            btn.classList.remove('hover');
        }
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
        operandLeft: {
            value: [],
            hasDecimal: false,
        },
        operandRight: {
            value: [],
            hasDecimal: false,
        },
        operation: '',
    };

    function updateCalculatorState(btn) {
        if (isNumeric(btn)) {
            updateCalculatorOperands(btn.textContent);
        }

        if (isOperator(btn)) {
            applyOperatorToCalculatorState(btn.textContent);
        }

        console.log(calculatorState);
    }

    const MAX_OPERAND_LENGTH = 12;

    function updateCalculatorOperands(char) {
        let operand = getActiveOperand();
        if (char == '.') {
            // do not allow more than one decimal point
            if (operand.hasDecimal) return;
            operand.hasDecimal = true;

            // first char should not be '.'
            if (operand.value.length == 0) {
                operand.value.push('0');
            }
        }

        if (operand.value.join('') == '0') {
            // only allow leading zero on decimal
            if (char != '.') {
                operand.value.pop();
            }
        }

        if (operand.value.length == MAX_OPERAND_LENGTH) {
            return;
        }

        operand.value.push(char);
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
        calculatorState.operation = '';
        calculatorState.operandLeft.value = [];
        calculatorState.operandLeft.hasDecimal = false;
        calculatorState.operandRight.value = [];
        calculatorState.operandRight.hasDecimal = false;
    }

    function applyBackspace() {
        const operand = getActiveOperand();
        operand.value.pop();
    }

    function calculate() {
        if (empty(calculatorState.operandLeft)) return;
        if (empty(calculatorState.operandRight)) return;
        if (calculatorState.operation == '') return;

        const a = Number(calculatorState.operandLeft.value.join(''));
        const b = Number(calculatorState.operandRight.value.join(''));
        
        const opLookup = {
            '+': (a, b) => a + b,
            '-': (a, b) => a - b,
            '×': (a, b) => a * b,
            '÷': (a, b) => a / b,
        };

        const res = opLookup[calculatorState.operation](a, b);
        clearCalculatorState();
        let value = (
            Array.from(String(res)).splice(0, MAX_OPERAND_LENGTH)
            // note: this will truncate very long numbers
        );
        let hasDecimal = value.includes('.');

        while (hasDecimal && value.at(-1) == '0') {
            value.pop();
        }

        calculatorState.operandLeft = {value, hasDecimal};
    }

    function applyOperation(opChar) {
        if (calculatorState.operation) {
            calculate();
        }
        if (!empty(calculatorState.operandLeft)) {
            calculatorState.operation = opChar;
        }
    }

    function empty(operand) {
        const {value} = operand;
        return value.join('') == '';
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
        const a = calculatorState.operandLeft.value.join('');
        const b = calculatorState.operandRight.value.join('');
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