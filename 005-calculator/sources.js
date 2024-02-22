document.addEventListener('DOMContentLoaded', () => {
    const app_root = document.querySelector('#root');
    const buttons = document.querySelectorAll('.button');

    app_root.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keyboardHandler);

    function clickHandler(event) {
        const target = event.target;
        if (!target.classList.contains('button')) return;
        updateCalculatorState(target);
        updateUserInterface();
    }

    function keyboardHandler(event) {
        const translate_key = {
            'c': 'C',
            'Backspace': '←',
            '/': '÷',
            'x': '×',
            '*': '×',
            'Enter': '=',
        };

        const btn = findButtonByTextContent(translate_key[event.key] ?? event.key);
        if (!btn) return;

        // redirect to click handler
        btn.click();
    }

    function findButtonByTextContent(content) {
        for (const btn of buttons) {
            if (btn.textContent == content) {
                return btn;
            }
        }
        return null;
    }

    const calculator_state = {
        operand_1: {
            value: [],
            has_decimal: false,
        },
        operand_2: {
            value: [],
            has_decimal: false,
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

        console.log(calculator_state);
    }

    const MAX_OPERAND_LENGTH = 12;

    function updateCalculatorOperands(char) {
        let operand = getActiveOperand();
        if (char == '.') {
            // do not allow more than one decimal point
            if (operand.has_decimal) return;
            operand.has_decimal = true;

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
            calculator_state.operation == '' ?
                calculator_state.operand_1 :
                calculator_state.operand_2
        );
    }

    function isNumeric(btn) {
        return btn.classList.contains('numeric');
    }

    function applyOperatorToCalculatorState(op_char) {
        if (op_char == 'C') {
            clearCalculatorState();
            return;
        }
    }

    function clearCalculatorState() {
        calculator_state.operation = '';
        calculator_state.operand_1.value = [];
        calculator_state.operand_1.has_decimal = false;
        calculator_state.operand_2.value = [];
        calculator_state.operand_2.has_decimal = false;
    }

    function isOperator(btn) {
        return btn.classList.contains('operator');
    }

    function updateUserInterface() {
        updateDisplay();
    }

    const OPERAND_PLACEHOLDER_TEXT = ' ';
    const lower_display = app_root.querySelector('#display>#lower');

    function updateDisplay() {
        const operand = calculator_state.operand_1.value.join('');
        lower_display.textContent = (
            operand == '' ?
                OPERAND_PLACEHOLDER_TEXT :
                operand
        );
    }
});