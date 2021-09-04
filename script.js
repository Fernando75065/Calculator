let radius = 200;
let angleDecimals = 4;
let trigonometryFunctionsDecimals = 10;

let canvas;
let slider;
let noneButton;
let sinusButton;
let cosinusButton;
let angleInput1;
let angleInput2;
let sinusOutput;
let cosinusOutput;
let tangensOutput;

function setup() {
    canvas = createCanvas(4 * radius, 4 * radius);
    canvas.parent("sketchHolder");

    slider = document.getElementById("angleSlider");
    slider.max = 360 - pow(10, -angleDecimals);
    slider.step = pow(10, -angleDecimals);

    noneButton = document.getElementById("noneButton");
    sinusButton = document.getElementById("sinusButton");
    cosinusButton = document.getElementById("cosinusButton");

    angleInput1 = document.getElementById("angleInput_1");
    angleInput2 = document.getElementById("angleInput_2");

    sinusOutput = document.getElementById("sinusOutput");
    cosinusOutput = document.getElementById("cosinusOutput");
    tangensOutput = document.getElementById("tangensOutput");

    angleMode(DEGREES);
    noFill();
    setOutput();
    handleSlider();
}

function draw() {
    background(255);
    drawGrid();
    drawCircle();
}

function drawGrid() {
    stroke(220);
    for (let x = 0; x < width; x += 10) {
        line(x, 0, x, height);
    }

    for (let y = 0; y < height; y += 10) {
        line(0, y, width, y);
    }
    stroke(150);

    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);

    stroke(0);
}

function drawCircle() {
    translate(width / 2, height / 2);
    stroke(0);

    circle(0, 0, radius * 2);
    let x = cos(-slider.value) * radius;
    let y = sin(-slider.value) * radius;

    drawRadiusLines(x, y);
    drawSinusLines(x, y);
    drawCosinusLines(x, y);

    stroke(0);
    translate(-(width / 2), -(height / 2));
}

function drawRadiusLines(x, y) {
    line(0, 0, x, y);
    if (sinusButton.checked) {
        stroke(0, 0, 0, 100)
        line(0, 0, -x, y);
    } else if (cosinusButton.checked) {
        stroke(0, 0, 0, 100);
        line(0, 0, x, -y);
    }
    stroke(0);
}

function drawSinusLines(x, y) {
    stroke(214, 15, 1);
    line(x, y, x, 0);
    if (sinusButton.checked) {
        stroke(214, 15, 1, 100);
        line(-x, y, -x, 0);
    } else if (cosinusButton.checked) {
        stroke(214, 15, 1, 100);
        line(x, 0, x, -y);
    }
    stroke(0)
}

function drawCosinusLines(x, y) {
    stroke(29, 48, 255);
    line(0, 0, x, 0);
    if (sinusButton.checked) {
        stroke(29, 48, 255, 100);
        line(0, 0, -x, 0);
    }
    stroke(0);
}

function handleInput1() {
    if (angleInput1.value === "") {
        slider.value = "0";
        angleInput2.value = "";
        return;
    }

    if (sinusButton.checked || cosinusButton.checked) {
        angleInput2.value = roundNumber(calculateOtherAngle(angleInput1.value % 360), angleDecimals);
    }
    slider.value = angleInput1.value % 360;
    setOutput();
}

function handleInput2() {
    if (angleInput2.value === "") {
        slider.value = "0";
        angleInput1.value = "";
        return;
    }

    if (sinusButton.checked || cosinusButton.checked) {
        angleInput1.value = roundNumber(calculateOtherAngle(angleInput2.value % 360), angleDecimals);
    }
    slider.value = angleInput2.value % 360;
    setOutput();
}

function handleSlider() {
    angleInput1.value = roundNumber(slider.value, angleDecimals);
    if (sinusButton.checked || cosinusButton.checked) {
        angleInput2.value = roundNumber(calculateOtherAngle(slider.value % 360), angleDecimals);
    } else {
        angleInput2.value = "";
    }
    setOutput();
}

function calculateOtherAngle(angle) {
    if (sinusButton.checked) {
        return calculateOtherSinusAngle(angle);
    } else if (cosinusButton.checked) {
        return 360 - angle;
    }
}

function calculateOtherSinusAngle(angle) {
    if (angle >= 0 && angle < 180) {
        return 180 - angle;
    } else if (angle >= 180 && angle < 360) {
        return 360 - (angle - 180);
    }
}

function setOutput() {
    sinusOutput.innerText = "Sinus: " + roundNumber(sin(slider.value), trigonometryFunctionsDecimals);
    cosinusOutput.innerText = "Cosinus: " + roundNumber(cos(slider.value), trigonometryFunctionsDecimals);
    tangensOutput.innerText = "Tangens: " + roundNumber(tan(slider.value), trigonometryFunctionsDecimals);
}

function roundNumber(number, decimals) {
    return round(number * pow(10, decimals)) / pow(10, decimals);
}

function mousePressed() {
    if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
        let fs = fullscreen();
        fullscreen(!fs);
    }
}