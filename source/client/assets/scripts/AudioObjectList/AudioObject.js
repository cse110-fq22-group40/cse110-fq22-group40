/**
 * This folder contains the implementation for the note taking page of an
 * AudioObject. It contains all the functions necessary to manage the notes for
 * an uploaded mp3 file.
 */

 import {utils, audio_utils, notes_utils} from "../../../../local/imports.js"

// Add all your HTML DOM elements here as global variables
const editor = document.getElementById("editor");
const audioVisualizer = document.getElementById("audio-visualizer");
const audioPlayer = document.getElementById("audio-player");
const textEditor = document.getElementById("text-editor");
const noteDisplay = document.getElementById("note-display");
const noteTemplate = document.getElementById("note-template");
const submitButton = document.getElementById("submit");
const updateForm = document.getElementById("update-note");
const updateFormYes = document.getElementsByClassName("update-yes")[0];
const updateFormNo = document.getElementsByClassName("update-no")[0];
const backButton = document.getElementById("back");

// Set the source of the audio player, show the editor, hide the update form, 
// and set up the audio visualizer
utils.load_data();
const folderFName = sessionStorage.getItem("FolderF");
const folderAName = sessionStorage.getItem("FolderA");
const audioObject = sessionStorage.getItem("AudObject");
const audio = audio_utils.get_audio_path(folderFName, folderAName, audioObject);
const notes = notes_utils.get_all_notes(folderFName, folderAName, audioObject);

/**
 * When the page loads, call loadAudio
 *
 * @type {window} - the target of the event
 * @listens window#load - when the window loads
 */
window.addEventListener("load", loadAudio(audio));

/**
 * When the page loads, call loadNotes
 *
 * @type {window} - the target of the event
 * @listens window#load - when the window loads
 */
window.addEventListener("load", loadNotes(notes));

/**
 * Loads the audio into the player when the audio object page loads
 * @param {string} src - path of the mp3 file
 * 
 * @Usage
 * Ex: loadAudio("path/of/music.mp3")
 */
function loadAudio(src) {
    utils._log(src);
    audioPlayer.src = src;
    editor.style.display = "block";
    initAudioVisualizer();
}

/**
 * Loads the notes into the container the audio object page loads
 * @param {Object} notes - Key is the timestamp and value is the note
 * 
 * @Usage
 * Ex: loadAudio({1: "musical note"})
 */
function loadNotes(notes){
    for (const timestamp in notes) {
        displayNote(timestamp, notes[timestamp]);
    }
}

/**
 * Initializes the audio visualization bar that appears when the audio is played
 * 
 * @Usage
 * Ex: initAudioVisualizer()
 */
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

    /**
     * Draws the audio visualizer onto the canvas
     * 
     * @Usage
     * Ex: animateAudioVisualizer()
     */
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

/**
 * Submits a note to be displayed onto the screen and stores into the backend
 * 
 * @Usage
 * Ex: submitNote()
 */
function submitNote() {
    const timestamp = Math.floor(audioPlayer.currentTime);
    
    if (!(textEditor.innerHTML === '')){
        // Store notes in backend
        try{
            notes_utils.add_note(folderFName, folderAName, audioObject, timestamp, textEditor.innerHTML);
            displayNote(timestamp, textEditor.innerHTML);
            // Clear text editor
            textEditor.innerHTML = "";
        } catch(err){
            //If a note already exists at the timestamp ask the user if they want to update it
            updateForm.style.display = "flex";
            updateFormYes.addEventListener("click",() => {
                updateForm.style.display = "none";
                notes_utils.update_note(folderFName,folderAName,audioObject,timestamp, textEditor.innerHTML);
                
                // Clear text editor
                textEditor.innerHTML = "";
                // TODO
                
            })
            updateFormNo.addEventListener("click",() => {
                updateForm.style.display = "none";
                // Clear text editor
            })
        }
        let new_notes = notes_utils.get_all_notes(folderFName, folderAName, audioObject)
        utils._log(new_notes);
    }
}

submitButton.addEventListener("click", submitNote);

/**
 * Called when a note is submitted, performs the operation to display the note
 * onto the screen
 * 
 * @param {string} timeStamp - current timestamp of the where the note exists
 * @param {string} text - the note the user types
 * 
 * @Usage 
 * Ex: displayNote("1","perfect technique")
 */
function displayNote(timestamp, text) {
    // Create copy of notes template
    const note = noteTemplate.content.cloneNode(true);

    // Order the notes by timestamp
    note.querySelector(".note").style.order = timestamp;

    // Link that sets the audio player to the timestamp when clicked
    const timestampLink = note.querySelector(".timestamp");
    timestampLink.textContent = utils.format_time(timestamp);

    timestampLink.addEventListener("click", () => {
        audioPlayer.currentTime = timestamp;
    });

    // Add the text to the note
    note.querySelector(".note-text").innerHTML = text;

    // Display the note on screen
    noteDisplay.appendChild(note);
}

/**
 * When the back button is clicked on the page go back to the previous page
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#click - when the AudioCard component is clicked
 */
backButton.addEventListener("click", () => {
    sessionStorage.removeItem("AudObject");
    window.location = "TypeA.html";
  });
