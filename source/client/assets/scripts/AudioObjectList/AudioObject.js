import * as utils from "../../../../local/utils.js"

// Add all your HTML DOM elements here as global variables
const audioForm = document.getElementById("audio-form");
const audioInput = document.getElementById("audio-input");
const editor = document.getElementById("editor");
const audioVisualizer = document.getElementById("audio-visualizer");
const audioPlayer = document.getElementById("audio-player");
const textEditor = document.getElementById("text-editor");
const noteDisplay = document.getElementById("note-display");
const noteTemplate = document.getElementById("note-template");
const clearButton = document.getElementById("clear-button");


// Set the source of the audio player, hide the audio input form,
// show the editor, and set up the audio visualizer

const folderFName = sessionStorage.getItem("FolderF");
const folderAName = sessionStorage.getItem("FolderA");
const audioObject = sessionStorage.getItem("AudObject");
console.log(folderFName);
console.log(folderAName);
console.log(audioObject);
const audio = utils.get_audio_path(folderFName, folderAName, audioObject);

window.addEventListener("DOMContentLoaded",loadAudio(audio));

function loadAudio(src) {
    audioPlayer.src = src;
    audioForm.style.display = "none";
    editor.style.display = "block";
    initAudioVisualizer();
}

// Set up the audio visualizer
function initAudioVisualizer() {
    // Set CSS dimensions to equal canvas dimensions
    audioVisualizer.style.width = audioVisualizer.width + "px";
    audioVisualizer.style.height = audioVisualizer.height + "px";

    // Drawing context for the canvas
    const ctx = audioVisualizer.getContext("2d");

    const audioCtx = new AudioContext(); // Audio-processing graph
    const analyser = audioCtx.createAnalyser(); // Exposes audio time and frequency data
    analyser.fftSize = 2048; // Window size of Fast Fourier Transform

    // Connect audio nodes together
    const source = audioCtx.createMediaElementSource(audioPlayer);
    source.connect(analyser);
    source.connect(audioCtx.destination);

    // Stores frequency data of audio
    const data = new Uint8Array(analyser.frequencyBinCount);

    // Calculate width of each bar
    const barWidth = Math.round(audioVisualizer.width / data.length * 4);

    // Linear gradient to use when displaying bars
    const gradient = ctx.createLinearGradient(0, 0, audioVisualizer.width, 0);
    gradient.addColorStop(0, "#FF00FF");
    gradient.addColorStop(0.5, "#00FFFF");
    gradient.addColorStop(1, "#00FFCC");
    ctx.fillStyle = gradient;

    animateAudioVisualizer();

    // Draw audio visualization onto canvas
    function animateAudioVisualizer() {
        // Copy current frequency data into array
        analyser.getByteFrequencyData(data);

        // Clear canvas
        ctx.clearRect(0, 0, audioVisualizer.width, audioVisualizer.height);

        // Loop through frequencies
        for (let i = 0; i < data.length; i++) {
            // Calculate height of each bar
            const barHeight = Math.round(audioVisualizer.height * Math.sqrt(data[i] / 255));

            // Draw bar
            ctx.fillRect(barWidth * i, audioVisualizer.height, barWidth, -barHeight);
        }

        requestAnimationFrame(animateAudioVisualizer);
    }
}

// Convert audio file to Base64
function getData(audioFile, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(audioFile);
    reader.onload = evt => {
        callback(evt.target.result);
    };
}

// Takes input as seconds and returns time formatted as hh:mm:ss
function formatTime(time) {
    const hours = Math.floor(time / 3600);
    let minutes = Math.floor(time / 60) % 60;
    let seconds = Math.floor(time % 60);
    
    // Append a 0 if seconds is only one digit
    if (seconds < 10)
        seconds = `0${seconds}`;

    // If the time is an hour or longer
    if (hours) {
        // Append a 0 if minutes is only one digit
        if (minutes < 10)
            minutes = `0${minutes}`;
        
        return `${hours}:${minutes}:${seconds}`;
    }
    
    // If the time is shorter than an hour
    return `${minutes}:${seconds}`;
}

// Called when submit button is pressed
function submit() {
    const timestamp = Math.floor(audioPlayer.currentTime);
    displayNote(timestamp, textEditor.innerHTML);

    // Store notes in local storage
    const notes = localStorage.notes ? JSON.parse(localStorage.notes) : {};
    notes[timestamp] = textEditor.innerHTML;
    localStorage.notes = JSON.stringify(notes);

    // Clear text editor
    textEditor.innerHTML = "";
}

// Display note on screen
function displayNote(timestamp, text) {
    // Create copy of notes template
    const note = noteTemplate.content.cloneNode(true);

    // Order the notes by timestamp
    note.querySelector(".note").style.order = timestamp;

    // Link that sets the audio player to the timestamp when clicked
    const timestampLink = note.querySelector(".timestamp");
    timestampLink.textContent = formatTime(timestamp);

    timestampLink.addEventListener("click", () => {
        audioPlayer.currentTime = timestamp;
    });

    // Add the text to the note
    note.querySelector(".note-text").innerHTML = text;

    // Display the note on screen
    noteDisplay.appendChild(note);
}

// Load audio from local storage
if (localStorage.audio)
    loadAudio(localStorage.audio);

// Load notes from local storage
if (localStorage.notes) {
    const notes = JSON.parse(localStorage.notes);

    // Loop through notes and display them on screen
    for (const timestamp in notes)
        displayNote(timestamp, notes[timestamp]);
}