/**
 * This folder contains the implementation for the note taking page of an
 * AudioObject. It contains all the functions necessary to manage the notes for
 * an uploaded mp3 file.
 */

import { utils, audio_utils, notes_utils } from "../../../../local/imports.js";

// See https://github.com/quilljs/awesome-quill for Quill add-ons

// Syntax highlighting for code-blocks
window.hljs = require("highlight.js");

// LaTeX support for inserting math equations
window.katex = require("katex");

const Quill = require("quill");

// Automatically convert markdown into rich-text!
const markdownShortcuts = require("quill-markdown-shortcuts");

// Emoji toolbar
const emoji = require("quill-emoji");

// Auto-detect URLs and convert them into functioning links
const magicUrl = require("quill-magic-url").default;

// Resize images and videos
const blotFormatter = require("quill-blot-formatter").default;

// Compress images to take up less space
const imageCompressor = require("quill-image-compress").imageCompressor;

// Prevents user from pasting invalid HTML
require("quill-paste-smart");

// Add all your HTML DOM elements here as global variables
const editor = document.getElementById("editor");
const audioVisualizer = document.getElementById("audio-visualizer");
const audioPlayer = document.getElementById("audio-player");
const noteDisplay = document.getElementById("note-display");
const noteTemplate = document.getElementById("note-template");
const submitButton = document.getElementById("submit");
const updateForm = document.getElementById("update-note");
const updateFormYes = document.getElementsByClassName("update-yes")[0];
const updateFormNo = document.getElementsByClassName("update-no")[0];
const homeButton = document.getElementById("home");
const backButton = document.getElementById("back");

// Set the source of the audio player, show the editor, hide the update form, 
// and set up the audio visualizer
utils.load_data();
const typeFName = sessionStorage.getItem("TypeF");
const typeAName = sessionStorage.getItem("TypeA");
const audioObjectName = sessionStorage.getItem("AudioObject");
const audio = audio_utils.get_audio_path(typeFName, typeAName, audioObjectName);
const notes = notes_utils.get_all_notes(typeFName, typeAName, audioObjectName);

const path = document.getElementById("path");

const Size = Quill.import("attributors/style/size");
const fontSizeArr = ["8px", "9px", "10px", "12px", false, "16px", "20px", "24px", "32px", "42px", "54px", "68px", "84px", "98px"];
Size.whitelist = fontSizeArr;
Quill.register(Size, true);

hljs.configure({
  languages: ["javascript", "typescript", "html", "css", "python", "java", "c", "c++", "csharp", "php", "sql", "r"]
});

Quill.register("modules/markdownShortcuts", markdownShortcuts);
Quill.register("modules/emoji", emoji);
Quill.register("modules/magicUrl", magicUrl);
Quill.register("modules/blotFormatter", blotFormatter);
Quill.register("modules/imageCompress", imageCompressor);

let quill;

window.addEventListener("load", () => {
  document.title += ` ❖ ${audioObjectName}`;
  path.innerHTML = `/\u2009${typeFName}\u2009/\u2009${typeAName}\u2009/\u2009${audioObjectName}`;

  quill = new Quill("#text-editor", {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }, { size: fontSizeArr }],
        ["bold", "italic", "underline", "strike"],
        [{ script: "sub" }, { script: "super" }],
        [{ color: [] }, { background: [] }],
        [{ align: "" }, { align: "center" }, { align: "right" }, { align: "justify" }, { direction: "rtl" }],
        [{ list: "bullet" }, { list: "ordered" }, { indent: "-1" }, { indent: "+1" }],
        ["blockquote", "code-block"],
        ["emoji", "link", "image", "video", "formula"],
        ["clean"]
      ],
      syntax: true,
      markdownShortcuts: true,
      "emoji-toolbar": true,
      "emoji-shortname": true,
      magicUrl: true,
      blotFormatter: true,
      imageCompress: {
        quality: 0.7,
        maxWidth: 400,
        maxHeight: 400
      },
      clipboard:  {
        keepSelection: true
      }
    },
    placeholder: "Take notes at your desired timestamp…",
    theme: "snow"
  });
});

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
  //initAudioVisualizer();
}

/**
 * Loads the notes into the container the audio object page loads
 * @param {Object} notes - Key is the timestamp and value is the note
 * 
 * @Usage
 * Ex: loadAudio({1: "musical note"})
 */
function loadNotes(notes) {
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
  const barWidth = Math.round(audioVisualizer.width / data.length * 20);

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
    
  if (quill.getLength() > 1) {
    const contents = JSON.stringify(quill.getContents());

    // Store notes in backend
    try {
      notes_utils.add_note(typeFName, typeAName, audioObjectName, timestamp, contents);
      displayNote(timestamp, contents);

      // Clear text editor
      quill.setContents();
    } catch(err) {
      // If a note already exists at the timestamp ask the user if they want to update it
      updateForm.style.display = "flex";
      
      updateFormYes.addEventListener("click", () => {
        updateForm.style.display = "none";
        notes_utils.update_note(typeFName,typeAName,audioObjectName,timestamp, contents);
                
        // Clear text editor
        quill.setContents();
        
        // TODO
        location.reload();
      });

      // Clear the prompt window if user doesn't want to update the note
      updateFormNo.addEventListener("click", () => {
        updateForm.style.display = "none";
      });
    }

    utils._log(notes_utils.get_all_notes(typeFName, typeAName, audioObjectName));
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
 * Ex: displayNote("1", "perfect technique")
 */
function displayNote(timestamp, text) {
  // Create copy of notes template
  const note = noteTemplate.content.cloneNode(true).querySelector(".note");

  // Order the notes by timestamp
  note.style.order = timestamp;

  // Link that sets the audio player to the timestamp when clicked
  const timestampLink = note.querySelector(".timestamp");
  timestampLink.textContent = utils.format_time(timestamp);

  timestampLink.addEventListener("click", () => {
    audioPlayer.currentTime = timestamp;
  });

  // Add the text to the note
  const noteQuill = new Quill(note.querySelector(".note-text"), {
    modules: {
      toolbar: false,
      syntax: true
    },
    theme: "snow"
  });
  noteQuill.setContents(JSON.parse(text));
  noteQuill.disable();

  // Display the note on screen
  noteDisplay.appendChild(note);

  const computedStyle = getComputedStyle(note);
  const height = parseInt(computedStyle.height);
  const paddingTop = parseInt(computedStyle.paddingTop);
  const paddingBottom = parseInt(computedStyle.paddingBottom);
  const marginBottom = parseInt(computedStyle.marginBottom);
  note.style.marginTop = `-${height + paddingTop + paddingBottom + marginBottom}px`;
  
  setTimeout(() => {
    note.classList.add("slide-down");
  }, 0);
}

homeButton.addEventListener("click", () => {
  window.location = "index.html";
});

/**
 * When the back button is clicked on the page go back to the previous page
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#click - when the AudioCard component is clicked
 */
backButton.addEventListener("click", () => {
  window.location = "type-a.html";
});
