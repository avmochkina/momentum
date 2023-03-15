//Time
const time = document.querySelector('.time');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = `${currentTime}`;    
}
setInterval(showTime, 1000);

//Date
const date = document.querySelector('.date');

function showDate() {
    const calender = new Date();
    const options = {weekday: 'long', month: 'long', day: 'numeric', };
    const currentDate = calender.toLocaleDateString('en-US', options);
    date.textContent = `${currentDate}`;
}
showDate()


//Greeting
const greeting = document.querySelector('.greeting');

function getTimeOfDay() {
    const date1 = new Date();
    const hours = date1.getHours();
    const dayTime = hours/6;
    if(dayTime >= 1 && dayTime < 2) return 'Morning'
    else if(dayTime >= 2 && dayTime < 3) return 'Afternoon'
    else if(dayTime >= 3 && dayTime < 4) return 'Evening'
    else if(dayTime >= 2 && dayTime < 3) return 'Night'
}

function showGreeting() {
    const timeOfDay = getTimeOfDay();
    const greetingText = `Good ${timeOfDay}`
    greeting.textContent = `${greetingText}`;
}
showGreeting()

//Feel input
const name = document.querySelector('.name');

function setLocalStorage() {
    localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
    if(localStorage.getItem('name')) {
        name.value = localStorage.getItem('name');
    }
}
window.addEventListener('load', getLocalStorage);

//Slider
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

let randomNum = String(getRandomNum(0.01, 0.21)).padStart(2, "0");
let bgNum = randomNum;

const body = document.querySelector('body');

function getRandomNum(min, max) {
    return Math.trunc((Math.random() * (max - min) + min) * 100);
}

function setBg() {
    const img = document.createElement('img');
    img.src = `https://raw.githubusercontent.com/avmochkina/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.webp`;
    img.onload = () => {
        body.style.backgroundImage = `url('https://raw.githubusercontent.com/avmochkina/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.webp')`;
    };
}
setBg()

function getSlideNext() {
    if (bgNum === '20') {
        bgNum = '01';
    } else {
        bgNum = String(++bgNum).padStart(2, "0");
    }
    setBg();
}

function getSlidePrev() {
    if (bgNum === '01') {
        bgNum = '20'.padStart(2, "0");
    } else {
        bgNum = String(--bgNum).padStart(2, "0");
    }
    setBg()
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

//Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');
let cityValue = localStorage.getItem('city');

let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=eng&appid=c0176c8fe3b685af42474b8418607f31&units=metric`

async function getWeather() {  
    try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&lang=eng&appid=c0176c8fe3b685af42474b8418607f31&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 

    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)} °C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/sec`;
    humidity.textContent = `Humidity: ${data.main.humidity} %`;
    }
    catch(error) {
        weatherError.textContent = 'City not found';
        weatherIcon.style.display = 'none';
        temperature.textContent = ''
        weatherDescription.textContent = ''
        wind.textContent = ''
        humidity.textContent = ''
    }
}
getWeather();


function setCity(event) {
    if (event.code === 'Enter') {
        cityValue = city.value.replace((city) => city.toUpperCase())
        getWeather();
    }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

function setLocalStorageCity() {
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageCity)


function getLocalStorageCity() {
    if(localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    }
}
window.addEventListener('load', getLocalStorageCity);

//Quote
const changeQuote = document.querySelector('.change-quote');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.author');


async function getQuotes() {  
    const url = `https://type.fit/api/quotes`;
    const resultQuote = await fetch(url);
    if (resultQuote) {
        const data = await resultQuote.json();
        const randomNumber = getRandomNumber(data.length - 1);
        quoteText.textContent = data[randomNumber].text;
        quoteAuthor.textContent = data[randomNumber].author;
    }
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

document.addEventListener('DOMContentLoaded', getQuotes);
changeQuote.addEventListener('click', () => {
    getQuotes();
    changeQuote.classList.toggle(`change-quote_active`);
});


//Audioplayer
const player = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const prevBtn = document.querySelector('.play-prev');
const nextBtn = document.querySelector('.play-next');
const audio = document.querySelector('.audio');
const title = document.querySelector('.title');
const stopBtn = document.querySelector('.play-pause');
const playList = document.querySelectorAll('.song');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const currentDuration = document.querySelector('.current');
const totalDuration = document.querySelector('.total');


const songs = ['Ludovico Einaudi Experience', 'Ludovico Einaudi Night', 'Ludovico Einaudi Primavera', 'Ludovico Einaudi Una Mattina', 'Ludovico Einaudi Walk'];
//Default song
let songIndex = 0;

function loadSong(song) {
    title.innerHTML = song;
    audio.src = `./assets/sounds/${song}.mp3`;
    
}
loadSong(songs[songIndex]);
//Play
function playSong() {
    audio.play();
    stopBtn.src = './assets/icons/pause.svg';
    player.classList.add('play');
    playList[songIndex].classList.add('active');
}

//Pause
function pauseSong() {
    audio.pause();
    stopBtn.src = './assets/icons/play.svg';
    player.classList.remove('play');
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//Next song
function nextSong() {
    songIndex++;
    playList[songIndex-1].classList.remove('active');

    if(songIndex > songs.length -1) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}
nextBtn.addEventListener('click', nextSong);

//Previous song
function prevSong() {
    songIndex--;
    playList[songIndex+1].classList.remove('active');

    if(songIndex < 0) {
        songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);
    playSong();
}
prevBtn.addEventListener('click', prevSong);

//Progress bar
function updateProgress() {
    const duration = audio.duration;
    const currentTime = audio.currentTime;
    const progressPercentage = (currentTime/duration) * 100;
    progress.style.width = `${progressPercentage}%`;

    var currentMinute = parseInt(currentTime/60);
    var currentSec = parseInt(currentTime % 60);
    var currentSecFormat = currentSec < 10 ? `0${currentSec}` : `${currentSec}` 
    currentDuration.innerHTML = currentTime ? `${currentMinute}:${currentSecFormat}` : '0:00';

    var minute = parseInt(duration/60);
    var sec = parseInt(duration % 60)
    totalDuration.innerHTML = duration ? `${minute}:${sec}` : '0:00';
}
audio.addEventListener('timeupdate', updateProgress);

//Set Progress
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);

//AutoPlay
audio.addEventListener('ended', nextSong);

