/**
 * File Header:
 * This file defines the AudioObject Class. Add more...
 * 
 * 
 */
const fs = require("fs");
const path = require("path");

export class AudioObject {
  /**
  * AudioObject is a container for the path to the audio file
  * and the dictionary of notes
  * @param {string} path Path to audio file
  * 
  * @throws Error if audio file path does not exist
  */
  constructor(path) {
    this.update_path(path);
      
    // {"timestamp" : "text"}
    this.notes = {};
  }

  /**
  * Updates path to audio file
  * @param {string} newPath New path to audio file
  * 
  * @throws Error if audio file path is empty string
  * @throws Error if audio file path does not exist
  */
  update_path(newPath) {
    if (newPath === "") {
      throw new Error("Invalid audio file path: File path cannot be empty");
    }

    if (!fs.existsSync(path.resolve(__dirname, newPath)))
      throw new Error("Invalid audio file path");
    
    if (path.isAbsolute(newPath))
      this.path = path.relative(__dirname, newPath);
    else
      this.path = newPath;
  }

  /**
  * Getter for audio file path
  *
  * @return Audio file path
  * 
  * @throws Error if audio file path has changed or was deleted
  */
  get_path() {
    if (fs.existsSync(path.resolve(__dirname, this.path)))
      return this.path;
    
    throw new Error("Audio file path no longer exists");
  }

  /** 
  * Add specific note with a timestamp
  * @param {number} timestamp Timestamp of the note (in seconds)
  * @param {string} note The note
  * 
  * @throws Error if the specified timestamp isn't a valid number (in seconds)
  * @throws Error if the specified timestamp already exists
  */
  add_note(timestamp, note) {
    timestamp = parseInt(timestamp);

    if (Number.isNaN(timestamp))
      throw new Error(`Timestamp must be a valid number (in seconds)`);

    if (this.notes[timestamp])
      throw new Error(`Note already exists at timestamp ${timestamp}`);

    this.notes[timestamp] = note;
  }

  /** 
  * Getter for specific note given a timestamp
  * @param {number} timestamp Timestamp of the note (in seconds)
  * 
  * @throws Error if note with timstamp does not exist
  * @return Note
  */
  get_note(timestamp) {
    //if (!this.notes[timestamp])
    //  throw new Error(`Note with timstamp "${timestamp}" does not exist.`);

    return this.notes[timestamp];
  }
  
  /** 
  * Checks if a note exists that the given timestamp for this AudioObject
  * @param {number} timestamp Timestamp of the note (in seconds)
  * 
  * @return True if a note exits at the timestamp, False otherwise
  */
  does_note_exist(timestamp) {
    if (this.notes[timestamp])
      return true;
    else
      return false;
  }

  /**
  * Getter for all the notes
  *
  * @return Dictionary containing all the notes
  */
  get_notes() {
    return this.notes;
  }

  /**
   * Change the timestamp of an existing note
   * @param {number} timestamp Old timestamp of the note (in seconds)
   * @param {number} newTmestamp New timestamp of the note (in seconds)
   * 
   * @throws Error if the new timestamp isn't a valid number (in seconds)
   * @throws Error if the old timestamp doesn't exist
   * @throws Error if the new timestamp already exists
   */
  update_timestamp(timestamp, newTimestamp) {
    newTimestamp = parseInt(newTimestamp);

    if (Number.isNaN(newTimestamp))
      throw new Error(`Timestamp must be a valid number (in seconds)`);

    if (!this.notes[timestamp])
      throw new Error(`Note doesn't exist at timestamp ${timestamp}`);

    if (this.notes[newTimestamp])
      throw new Error(`Note already exists at timestamp ${newTimestamp}`);
    
    this.notes[newTimestamp] = this.notes[timestamp];
    delete this.notes[timestamp];
  }

  /**
   * Change the note at a specific timestamp
   * @param {number} timestamp Timestamp of the note (in seconds)
   * @param {string} newNote The new note
   * 
   * @throws Error if the specified timestamp doesn't exist
   */
  update_note(timestamp, newNote) {
    if (!this.notes[timestamp])
      throw new Error(`Note doesn't exist at timestamp ${timestamp}`);

    this.notes[timestamp] = newNote;
  }
  
  /** 
  * Deletes note given timestamp
  * @param {number} timestamp Timestamp of the note (in seconds)
  * 
  * @throws Error if the specified timestamp doesn't exist
  */
  delete_note(timestamp) {
    if (!this.notes[timestamp])
      throw new Error(`Note doesn't exist at timestamp ${timestamp}`);

    delete this.notes[timestamp];
  }

  /**
   * Clears note dictionary
   */
  clear_notes() {
    this.notes = {};
  }
}