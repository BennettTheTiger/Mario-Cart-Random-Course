import Courses from "../data/Courses.js";

const SPIN_COUNT = 25;
const trackNameElement = document.querySelector('#track-name');
const trackImageElement = document.querySelector('#track-image');
const cupNameElement = document.querySelector('#cup-name');
const cupImageElement = document.querySelector('#cup-image');

function getRandomCourse(options = Courses){
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function getCupImagePath(track) {
    const cupName = (track?.cup || '').toLowerCase();
    const rootPath = './assets/cup';
    return `${rootPath}/${cupName}_icon.png`;
}

function getTrackImagePath(track) {
    const cupName = (track?.cup || '').toLowerCase(); 
    const rootPath = './assets';
    return `${rootPath}/${cupName}_0${track.cupOrder}.jpg`;
}

function pickRandomTrack(){
    const track = getRandomCourse();
    trackNameElement.innerHTML = track.name;
    trackImageElement.src = getTrackImagePath(track);
    cupNameElement.innerHTML = track.cup;
    cupImageElement.src = getCupImagePath(track);
}

async function simulateSpin() {
    let spinDelay = 0;
    let spin = 0;
    do {
        await new Promise(resolve => setTimeout(function() {
            pickRandomTrack();
            resolve();
        }, spinDelay));
        spinDelay += Math.random() * 25; // time increase factor
        spin++;
    } while(spin < SPIN_COUNT);
}

document.querySelector('#getTrackButton').addEventListener('click', simulateSpin);
