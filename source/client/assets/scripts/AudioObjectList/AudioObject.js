import * as utils from "../../../../local/utils.js"

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

// Set the source of the audio player, show the editor, hide the update form, 
// and set up the audio visualizer
utils.load_data();
const folderFName = sessionStorage.getItem("FolderF");
const folderAName = sessionStorage.getItem("FolderA");
const audioObject = sessionStorage.getItem("AudObject");
const audio = utils.get_audio_path(folderFName, folderAName, audioObject);
const notes = utils.get_all_notes(folderFName, folderAName, audioObject);

window.addEventListener("load", loadAudio(audio));
window.addEventListener("load", loadNotes(notes));

//Load the audio and initialize the visualizer
function loadAudio(src) {
    console.log(src);
    audioPlayer.src = src;
    editor.style.display = "block";
    initAudioVisualizer();
}

//Load the pre-existing notes if they exist and map them onto the screen
function loadNotes(notes){
    console.log(notes);
    for (const timestamp in notes) {
        displayNote(timestamp, notes[timestamp]);
    }
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

// Called when submit button is pressed

function submitNote() {
    const timestamp = Math.floor(audioPlayer.currentTime);

    // Store notes in backend
    try{
        utils.add_note(folderFName, folderAName, audioObject, timestamp, textEditor.innerHTML);
        displayNote(timestamp, textEditor.innerHTML);
    }catch(err){
        //If a note already exists at the timestamp ask the user if they want to update it
        updateForm.style.display = "flex";
        updateFormYes.addEventListener("click",() => {
            utils.update_note(folderFName,folderAName,audioObject,timestamp, textEditor.innerHTML);
            location.reload();
        })
        updateFormNo.addEventListener("click",() => {
            updateForm.style.display = "none";
        })
    }
    console.log(utils.get_all_notes(folderFName, folderAName, audioObject));
    // Clear text editor
    textEditor.innerHTML = "";
}

submitButton.addEventListener("click", submitNote);

// Display note on screen
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