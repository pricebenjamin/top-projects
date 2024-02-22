document.addEventListener('DOMContentLoaded', () => {
    const app_root = document.querySelector('#root');
    const buttons = document.querySelectorAll('.button');

    app_root.addEventListener('click', clickHandler);
    document.addEventListener('keydown', keyboardHandler);

    function clickHandler(event) {
        const target = event.target;
        if (!target.classList.contains('button')) return;
        console.log(target.textContent);
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
});