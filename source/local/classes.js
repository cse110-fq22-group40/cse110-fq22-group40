const fs = require("fs");
const path = require("path");

// function: the_brown_cow
// classes: StartWithUpper (camel)
// objects: camelCase
// data: hungarianCamel

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
  * @throws Error if audio file path does not exist
  */
  update_path(newPath) {
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
    if (!this.notes[timestamp])
      throw new Error(`Note with timstamp "${timestamp}" does not exist.`);

    return this.notes[timestamp];
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

export class TypeA {
  /**
  * TypeA is a container for a group of audio objects
  */
  constructor() {
    // Dict of AudioObject {"name" : AudioObject}
    this.dict_audio = {};
  }

  /**
   * Create a new audio file
   * @param {string} name Name of the audio file
   * @param {string} path Path of the audio file
   * 
   * @throws Error if the AudioObj name is empty
   * @throws Error if the AudioObj name already exists
   * @throws Error if audio file path does not exist
   */
  add_audio(name, path) {
    if (name === "")
      throw new Error("Audio file name cannot be empty");

    if (this.dict_audio[name])
      throw new Error(`Audio file with name "${name}" already exists`);

    this.dict_audio[name] = new AudioObject(path);
  }

  /**
   * Getter for an audio object in dict_audio
   * @param {string} audioObjName Name of the audio file
   * 
   * @throws Error if the audio object does not exist
   * @return Audio Object
   */
  get_audio(audioObjName) {
    if (!this.dict_audio[audioObjName])
      throw new Error(`Audio file with name "${audioObjName}" does not exist`);

    return this.dict_audio[audioObjName];
  }

  /**
   * Getter for all audio object names in dict_audio
   * 
   * @return String names of all audio objects in dict_audio
   */
  get_all_audio_names() {
    return Object.keys(this.dict_audio);
  }

  /**
   * Update an AudioObj name inside this TypeA object
   * 
   * @param {string} oldName Old name of the AudioObj you want to change
   * @param {string} newName New name of the AudioObj you want to change
   * 
   * @throws Error if the AudioObj name is empty
   * @throws Error if the old AudioObj name doesn't exist
   * @throws Error if the new AudioObj name already exists
   */
  update_audio_name(oldName, newName) {
    if (newName === "")
      throw new Error("Audio file name cannot be empty");

    if (!this.dict_audio[oldName])
      throw new Error(`Audio file with name "${oldName}" doesn't exist`);

    if (this.dict_audio[newName])
      throw new Error(`Audio file with name "${newName}" already exists`);

    this.dict_audio[newName] = this.dict_audio[oldName];
    delete this.dict_audio[oldName];
  }
  
  /**
   * Deletes an audio object given the named
   * @param {string} audioName Name of the audio file
   * 
   * @throws Error if the audio object does not exist
   */
  delete_audio(audioName) {
    if (!this.dict_audio[audioName])
      throw new Error(`Audio file with name "${audioname}" doesn't exist`);

    delete this.dict_audio[audioName];
  }

  /**
   * Clears all audio objects in this folder
   */
  clear_folder() {
    this.dict_audio = {};
  }
}

export class TypeF {
  /**
  * TypeF is a container for a group of TypeA objects
  */
  constructor() {
    // Dict of Type A folders {"name" : typeA}
    this.dict_typeA = {};
  }

  /**
   * Add a new TypeA folder with the specified name
   * @param {string} name The name of the TypeA folder
   * 
   * @throws Error if the TypeA folder name is empty
   * @throws Error if the TypeA folder name already exists
   */
  add_typeA(name) {
    if (name === "")
      throw new Error("TypeA folder name cannot be empty");

    if (this.dict_typeA[name])
      throw new Error(`TypeA folder with name "${name}" already exists`);

    this.dict_typeA[name] = new TypeA(name);
  }

  /**
   * Getter for a type A folder 
   * @param {string} typeAName Name of the type A folder
   * 
   * @throws Error if type A folder doesn't exist
   * @return Type A Object
  */
  get_typeA(typeAName) {
    if (!this.dict_typeA[typeAName])
      throw new Error(`TypeA folder with name "${audioname}" doesn't exist`);

    return this.dict_typeA[typeAName];
  }

  /**
   * Getter for all type A folder names
   * @return Type A Object
   */
  get_all_typeA_names() {
    return Object.keys(this.dict_typeA);
  }

/**
 * Update a typeA object's name inside this TypeF object
 * 
 * @param {string} oldName Old name of the typeA folder you want to change
 * @param {string} newName New name of the typeA folder you want to change
 * 
 * @throws Error if the TypeA folder name is empty
 * @throws Error if the old TypeA folder name doesn't exist
 * @throws Error if the new TypeA folder name already exists
 */
  update_typeA_name(oldName, newName) {
    if (newName === "")
      throw new Error("TypeA folder name cannot be empty");

    if (!this.dict_typeA[oldName])
      throw new Error(`TypeA folder with name "${oldName}" doesn't exist`);
    
    if (this.dict_typeA[newName])
      throw new Error(`TypeA folder with name "${newName}" already exists`);

    this.dict_typeA[newName] = this.dict_typeA[oldName];
    delete this.dict_typeA[oldName];
  }
  
  /**
  * Removes a type A folder
  * @param {string} typeAName Name of the type A folder
  */
  delete_typeA(typeAName) {
    if (!this.dict_typeA([typeAName]))
      throw new Error(`TypeA folder with name "${typeAName} doesn't exist`);
      
    delete this.dict_typeA[typeAName];
  }

  /**
   * Deletes all type A folders
   */
  clear_folder() {
    this.array_typeA = {};
  }
}
