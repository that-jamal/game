import './style.css';


const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
const context = canvas.getContext('2d')!;
document.querySelector('#app')!.append(canvas);
const player = new Image();
const tree = new Image();

tree.onload = function () {
    // Now the image is loaded and you can draw it on the canvas
};
player.onload = function () {
    // Now the image is loaded and you can draw it on the canvas
};
type Rectangle = {
    x: number,
    y: number,
    width: number,
    height: number
}
let explosion = false
let y = 300
let x = 400
let size = 60
let w = false
let a = false
let s = false
let d = false
let wallY = canvas.height - size
let wallX = canvas.width - size
let wallL = 0
let moving = false

window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);
requestAnimationFrame(gameLoop);

function gameLoop() {
    requestAnimationFrame(gameLoop);
    update();
    render();
}

function collides(a: Rectangle, b: Rectangle) {
    return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
    );
}



function onKeyUp(e) {
    if (e.key == 'w') { w = false }
    if (e.key == 'a') { a = false }
    if (e.key == 'd') { d = false }
    if (e.key == 's') { s = false }
    // Check if all movement keys are released
    if (!w && !a && !s && !d) {
        moving = false;
    }
}


function onKeyDown(e) {
    if (explosion == false) {
        if (e.key == 'w') { w = true }
        if (e.key == 'a') { a = true }
        if (e.key == 's') { s = true }
        if (e.key == 'd') { d = true }
        if (e.key == ' ') { explosion = true }

        // Check if any of the movement keys are pressed
        if (w || a || s || d) {
            moving = true;
        }
    }
}

function changeImage() {
    if (moving) {
        if (player.src.endsWith("lfbill.png")) {
            player.src = "rfbill.png";
        } else {
            player.src = "lfbill.png";
        }
    }
    if (explosion) {
        player.src = "boom.png";
        if (setInterval(changeImage) > 7000) { player.src = ""; }
    }


    // console.log(setInterval(changeImage, 200))
}
player.src = 'lfbill.png';
tree.src = 'tree.png';
// Start the timer to change the image every second
setInterval(changeImage, 200);

let xList = [{ boxX: 400, boxY: 100, obsH: 100, obsW: 100 },
{ boxX: 100, boxY: 400, obsH: 140, obsW: 50 },
{ boxX: 500, boxY: 400, obsH: 100, obsW: 150 }]

function update() {




    if (a) { x -= 5 }
    if (d) { x += 5 }
    // koll kollisioner
    for (let i = 0; i < xList.length; i++) {
        if (collides({ x, y, width: size, height: size }, { x: xList[i].boxX, y: xList[i].boxY, width: xList[i].obsW, height: xList[i].obsH })) {

            if (d) {
                // flytta spelaren till vänstra kant av "obstacle x"
                x = xList[i].boxX - size;
            }
            if (a) {
                x = xList[i].boxX + xList[i].obsW; w
                // flytta spelaren till högra kant av "obstacle y"
            }
        }
    }

    if (x > wallX) { x = wallX }
    if (x < wallL) { x = wallL }

    if (w) { y -= 5 }
    if (s) { y += 5 }
    for (let i = 0; i < xList.length; i++) {
        if (collides({ x, y, width: size, height: size }, { x: xList[i].boxX, y: xList[i].boxY, width: xList[i].obsW, height: xList[i].obsH })) {
            if (s) {
                y = xList[i].boxY - size;
            }
            if (w) {
                y = xList[i].boxY + xList[i].obsH;
            }
        }
    }
    if (y > wallY) { y = wallY }
    if (y < wallL) { y = wallL }

}

//context.drawImage(image
function render() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    //moving box
    context.beginPath();
    context.fillStyle = 'darkred';
    context.drawImage(player, x, y, size, size); //x
    context.imageSmoothingEnabled = false;
    context.fill();

    context.beginPath();
    context.fillStyle = 'black';
    context.drawImage(tree, xList[0].boxX, xList[0].boxY - 20, xList[0].obsW, xList[0].obsH + 20);
    context.imageSmoothingEnabled = false;
    context.fill();

    context.beginPath();
    context.fillStyle = 'black';
    context.drawImage(tree, xList[1].boxX, xList[1].boxY - 20, xList[1].obsW, xList[1].obsH + 20);
    context.imageSmoothingEnabled = false;
    context.fill();

    context.beginPath();
    context.fillStyle = 'black';
    context.drawImage(tree, xList[2].boxX, xList[2].boxY - 20, xList[2].obsW, xList[2].obsH + 20);
    context.imageSmoothingEnabled = false;
    context.fill();
    //boxX, boxY
}
