document.addEventListener('DOMContentLoaded', main);

const grid_size = document.querySelector('#grid-size');
grid_size.addEventListener('change', main);

const grid_root = document.querySelector('.grid');
grid_root.addEventListener('mouseover', (e) => {
    if (!e.target.id) return;
    console.log(e.target.id);
});

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
        cell.style.backgroundColor = `hsl( ${randomInt(360)} 100% 97% )`;
        cell.id = `id${size * row_idx + i}`;
        row.appendChild(cell);
    }
    return row;
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}