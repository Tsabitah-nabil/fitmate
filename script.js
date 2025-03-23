let activeColumn = 1;

function updateActiveColumn(column) {
    const columns = document.querySelectorAll('.main-column');
    if (column != null) {
        if (column < 0) {
            column = columns.length - 1;
        } else if (column >= columns.length) {
            column = 0;
        }
    }
    activeColumn = column;
    columns.forEach((column, index) => {
        if (index === activeColumn) {
            column.classList.add('selected');
        } else {
            column.classList.remove('selected');
        }
    });
}

function nextColumn() {
    updateActiveColumn(activeColumn === null ? 0 : activeColumn + 1);
}

function previousColumn() {
    updateActiveColumn(activeColumn === null ? 0 : activeColumn - 1);
}

function onLoad() {
    updateActiveColumn(activeColumn);

    const columns = document.querySelectorAll('.main-column');
    columns.forEach((column, index) => {
        column.addEventListener('mouseenter', () => {
            updateActiveColumn(index);
        });
    });

    const tagLinks = document.querySelectorAll('.tagline-header');
    tagLinks.forEach((tagLink) => {
        tagLink.addEventListener('mouseenter', () => {
            updateActiveColumn(null);
        });
    });
}

document.addEventListener('DOMContentLoaded', onLoad);
