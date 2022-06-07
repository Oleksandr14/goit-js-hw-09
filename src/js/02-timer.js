import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';

const refs = {
    startBtnEl: document.querySelector('button[data-start]'),
    inputEl: document.querySelector('#datetime-picker'),
    daysCounter: document.querySelector('[data-days]'),
    hoursCounter: document.querySelector('[data-hours]'),
    minutesCounter: document.querySelector('[data-minutes]'),
    secondsCounter: document.querySelector('[data-seconds]'),
};

refs.startBtnEl.addEventListener('click', onStartCounter);

setDisabled(refs.startBtnEl);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  
    onClose(selectedDates) {
        const selectedDate = selectedDates[0].getTime();
        const currentDate = Date.now();

      if (currentDate > selectedDate) {
          Notiflix.Notify.failure('Please choose a date in the future');
          return;
        };

        removeDisabled(refs.startBtnEl);
  },
};

flatpickr('#datetime-picker', options);

const timer = {
    timeInterval: null,
    isActive: false,

    start() {
        if (this.isActive) return;
        this.isActive = true;

        const selectedTime = new Date(refs.inputEl.value);
        
        this.timeInterval = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = selectedTime - currentTime;

            if (deltaTime < 0) {
                clearInterval(this.timeInterval);
                return;
            };

            const timeComponents = convertMs(deltaTime);
            onConvertTime(timeComponents);
           
            
        }, 1000);
    },
};

function onStartCounter() {
    timer.start();
};

function setDisabled(e) {
    e.setAttribute('disabled', 'disabled');
};

function removeDisabled(e) {
    e.removeAttribute('disabled');
};

function addZero(value) {
    return String(value).padStart(2, '0');
};

function onConvertTime({ days, hours, minutes, seconds }) {
    refs.daysCounter.textContent = `${days}`;
    refs.hoursCounter.textContent = `${hours}`;
    refs.minutesCounter.textContent = `${minutes}`;
    refs.secondsCounter.textContent = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  // Remaining days
    const days = addZero(Math.floor(ms / day));
  // Remaining hours
    const hours = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
    const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
    const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};







