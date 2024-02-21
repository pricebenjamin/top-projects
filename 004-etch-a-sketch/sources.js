document.addEventListener('DOMContentLoaded', main);

const grid_size = document.querySelector('#grid-size');
grid_size.addEventListener('change', main);

const grid_root = document.querySelector('.grid');

function main() {
    grid_root.replaceChildren([]);

    for (let i = 0; i < grid_size.value; i++) {
        const row = createGridRow(grid_size.value, i);
        grid_root.appendChild(row);
    }
}

function createGridRow(size, row_idx) {
    const row = document.createElement('div');
    row.classList.toggle('grid-row');
    for (let i = 0; i < size; i++) {
        const cell = document.createElement('div');
        cell.classList.toggle('grid-cell');
        cell.style.backgroundColor = '#FFFFFF';
        cell.id = `id${size * row_idx + i}`;
        row.appendChild(cell);
    }
    return row;
}

grid_root.addEventListener('mouseover', decreaseBrightness);

function decreaseBrightness(event) {
    const init_color = (window
        .getComputedStyle(event.target)
        .getPropertyValue('background-color')
    );
    event.target.style.backgroundColor = dim(init_color);
}

function dim(color_str) {
    const min_value = 40;
    const step_size = 0.2;
    let [r, g, b] = parseColor(color_str);
    r = Math.max(min_value, Math.floor(r * (1 - step_size)));
    g = Math.max(min_value, Math.floor(g * (1 - step_size)));
    b = Math.max(min_value, Math.floor(b * (1 - step_size)));
    return `rgb(${r}, ${g}, ${b})`;
}

function parseColor(rgb_str) {
    const segments = rgb_str.split(",")
    const numbers = segments.map(keepDigits)
    return numbers.map(Number);
}

function keepDigits(str) {
    return str.split("").filter(c =>
        '0' <= c && c <= '9'
    ).join("");
}