function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const refs = {
    body: document.body,
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
};

const DELAY = 1000;

let timerId = null;

refs.startBtn.addEventListener('click', onStartChangeColor);
refs.stopBtn.addEventListener('click', onStopChangeColor);

function onStartChangeColor() {

    setDisabled(refs.startBtn);
    removeDisabled(refs.stopBtn);

    timerId = setInterval(changeColor, DELAY);
};

function onStopChangeColor() {

    setDisabled(refs.stopBtn);
    removeDisabled(refs.startBtn);

    clearInterval(timerId);
};

function changeColor() {
    const color = getRandomHexColor();

    refs.body.style.backgroundColor = color;
};

function setDisabled(e) {
    e.setAttribute('disabled', 'disabled');
};

function removeDisabled(e) {
    e.removeAttribute('disabled');
};




