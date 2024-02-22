document.addEventListener('DOMContentLoaded', main);

function main() {
    const app_root = document.querySelector('#root');
    const layout = [
        'display',
        '7 8 9 ÷',
        '4 5 6 ×',
        '1 2 3 -',
        '= . 0 +',
    ];

    createLayoutOnPage();

    function createLayoutOnPage() {
        for (const row of layout) {
            const row_elements = row
                .trim()
                .split(' ')
                .filter(x => x != '');
            app_root.appendChild(createRow(row_elements));
        }
    }

    function createRow(row_elements) {
        const row = document.createElement('div');
        row.classList.toggle('button-row');
        row.classList.toggle('flex');

        row_elements.forEach(el => (
            row.appendChild(createButton(el))
        ));

        return row;
    }

    function createButton(content) {
        const btn = document.createElement('div');
        btn.classList.toggle('button');
        btn.classList.toggle('flex');
        btn.textContent = content;
        return btn;
    }
}
