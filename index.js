// Future improvemnts, change mode handling so that click isn't required to show the active mode
// Style
// Change number input to slider
// Improve speed handling so cells aren't skipped
// Add pen sizing capability
// Add opacity
// Add choose color


const canvas = document.querySelector('#canvas');
const gridSizeForm = document.querySelector('#gridSizeForm');
const gridSizeInput = document.querySelector('input[name="Grid Size Input"]');
const gridSizeSubmit = document.querySelector('input[type="submit"]');

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);




let currentMode = 'pen';

const modeBtns = document.querySelector('#modeButtons');

modeBtns.addEventListener('click', (e) => {

        let allBtns = document.querySelectorAll('#modeButtons button');

        allBtns.forEach((btn) => {
            btn.classList.remove('active-mode');
        })

        let target = e.target;

        modeBtns.classList.remove('active-mode');
        target.classList.add('active-mode');
        
        switch (target.id) {
            case 'penMode':
                currentMode = 'pen';
                break;
            case 'rainbowMode':
                currentMode = 'rainbow';
                break;
            case 'eraserMode':
                currentMode = 'eraser';
                break;
        }
    });


generateGrid(16);

gridSizeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    generateGrid(gridSizeInput.value);
});


function generateGrid(cellCount) {
    const canvasWidth = canvas.getBoundingClientRect().width;

    canvas.innerHTML = "";
    canvas.classList.remove('blank');
    canvas.classList.add('generated');


    cellCountSquared = cellCount * cellCount

    for (let i = 0; i < cellCountSquared; i++) {
        let innerCell = document.createElement("div");
        innerCell.classList.add("inner-cell");
        innerCell.style.width = (100 / Math.sqrt(cellCountSquared)) + "%";
        canvas.appendChild(innerCell);
        innerCell.addEventListener('mouseenter', changeColor);
        innerCell.addEventListener('mousedown', changeColor);
    }
}


function changeColor(e) {

    if ((e.type ===  'mouseenter' && mouseDown) || (e.type === 'mousedown')) {
    console.log(e.target);
    console.log(e.type);

    let randomH = Math.floor(Math.random() * 255);;
    let randomS = Math.floor(Math.random() * 255);
    let randomL = Math.floor(Math.random() * 255);

    if (currentMode === 'rainbow')  {
           e.target.style.backgroundColor = 'rgb(' + randomH + ", " + randomS + ", " + randomL + ")";
           e.target.style.border = "none";
    } else if (currentMode === 'pen') {
        e.target.style.backgroundColor = 'black';
        e.target.style.border = "none";
    } else if (currentMode === 'eraser') {
        e.target.style.backgroundColor = 'white';
        e.target.style.border = null;
    }
    } else {
        return;
    }

}

