const fs = require("fs");
const path = require("path");

// function: the_brown_cow
// classes: StartWithUpper (camel)
// objects: camelCase
// data: str_hungarianCamel

export class AudioObject {
  /**
  * AudioObject is a container for the path to the audio file
  * and the dictionary of notes
  * @param {string} str_path : Path to audio file
  * 
  * @throws Error if audio file path does not exist
  */
  constructor(str_path) {
    this.update_path(str_path);
      
    // {"timestamp" : "text"}
    this.notes = {};
  }

  /**
  * Updates path to audio file
  * @property {Function} update_path
  * @param {string} str_newPath: New path to audio file
  * 
  * @throws Error if audio file path does not exist
  */
  update_path(str_newPath) {
    if (!fs.existsSync(path.resolve(__dirname, str_newPath)))
      throw new Error("Invalid audio file path");
    
    if (path.isAbsolute(str_newPath))
      this.str_path = path.relative(__dirname, str_newPath);
    else
      this.str_path = str_newPath;
  }

  /**
  * Getter for audio file path
  *
  * @return Audio file path
  * 
  * @throws Error if audio file path has changed or was deleted
  */
  get_path() {
    if (fs.existsSync(path.resolve(__dirname, this.str_path)))
      return this.str_path;
    
    throw new Error("Audio file path no longer exists");
  }

  /** 
  * Add specific note with a timestamp
  * @param {num_timestamp} : Timestamp of the note (in seconds)
  * @param {str_note} : The note
  * 
  * @throws Error if the specified timestamp isn't a valid number (in seconds)
  * @throws Error if the specified timestamp already exists
  */
  add_note(num_timestamp, str_note) {
    num_timestamp = parseInt(num_timestamp);

    if (Number.isNaN(num_timestamp))
      throw new Error(`Timestamp must be a valid number (in seconds)`);

    if (this.notes[num_timestamp])
      throw new Error(`Note already exists at timestamp ${num_timestamp}`);

    this.notes[num_timestamp] = str_note;
  }

  /** 
  * Getter for specific note given a timestamp
  * @param {num_timestamp} : Timestamp of the note (in seconds)
  *
  * @return Note
  */
  get_note(num_timestamp) {
    return this.notes[num_timestamp];
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
   * @param {num_timestamp} : Old timestamp of the note (in seconds)
   * @param {num_newTimestamp} : New timestamp of the note (in seconds)
   * 
   * @throws Error if the new timestamp isn't a valid number (in seconds)
   * @throws Error if the old timestamp doesn't exist
   * @throws Error if the new timestamp already exists
   */
  update_timestamp(num_timestamp, num_newTimestamp) {
    num_newTimestamp = parseInt(num_newTimestamp);

    if (Number.isNaN(num_newTimestamp))
      throw new Error(`Timestamp must be a valid number (in seconds)`);

    if (!this.notes[num_timestamp])
      throw new Error(`Note doesn't exist at timestamp ${num_timestamp}`);

    if (this.notes[num_newTimestamp])
      throw new Error(`Note already exists at timestamp ${num_newTimestamp}`);
    
    this.notes[num_newTimestamp] = this.notes[num_timestamp];
    delete this.notes[num_timestamp];
  }

  /**
   * Change the note at a specific timestamp
   * @param {num_timestamp} : Timestamp of the note (in seconds)
   * @param {str_newNote} : The new note
   * 
   * @throws Error if the specified timestamp doesn't exist
   */
  update_note(num_timestamp, str_newNote) {
    if (!this.notes[num_timestamp])
      throw new Error(`Note doesn't exist at timestamp ${num_timestamp}`);

    this.notes[num_timestamp] = str_newNote;
  }
  
  /** 
  * Deletes note given timestamp
  * @param {num_timestamp} : Timestamp of the note (in seconds)
  */
  delete_note(num_timestamp) {
    delete this.notes[num_timestamp];
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
   * @param {str_name} : Name of the audio file
   * @param {str_path} : Path of the audio file
   * 
   * @throws Error if the AudioObj name is empty
   * @throws Error if the AudioObj name already exists
   */
  add_audio(str_name, str_path) {
    if (str_name === "")
      throw new Error("Audio file name cannot be empty");

    if (this.dict_audio[str_name])
      throw new Error(`Audio file with name "${str_name}" already exists`);

    this.dict_audio[str_name] = new AudioObject(str_path);
  }

  get_audio(str_audioObjName) {
    return this.dict_audio[str_audioObjName];
  }

  get_all_audio_names() {
    return Object.keys(this.dict_audio);
  }

  /**
   * Update an AudioObj name inside this TypeA object
   * 
   * @param {str_oldName} : Old name of the AudioObj you want to change
   * @param {str_newName} : New name of the AudioObj you want to change
   * 
   * @throws Error if the AudioObj name is empty
   * @throws Error if the old AudioObj name doesn't exist
   * @throws Error if the new AudioObj name already exists
   */
  update_audio_name(str_oldName, str_newName) {
    if (str_newName === "")
      throw new Error("Audio file name cannot be empty");

    if (!this.dict_audio[str_oldName])
      throw new Error(`Audio file with name "${str_oldName}" doesn't exist`);

    if (this.dict_audio[str_newName])
      throw new Error(`Audio file with name "${str_newName}" already exists`);

    this.dict_audio[str_newName] = this.dict_audio[str_oldName];
    delete this.dict_audio[str_oldName];
  }
  
  delete_audio(str_audioName) {
    delete this.dict_audio[str_audioName];
  }

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
   * @param {str_name} : The name of the TypeA folder
   * 
   * @throws Error if the TypeA folder name is empty
   * @throws Error if the TypeA folder name already exists
   */
  add_typeA(str_name) {
    if (str_name === "")
      throw new Error("TypeA folder name cannot be empty");

    if (this.dict_typeA[str_name])
      throw new Error(`TypeA folder with name "${str_name}" already exists`);

    this.dict_typeA[str_name] = new TypeA(str_name);
  }

  get_typeA(str_typeAName) {
    return this.dict_typeA[str_typeAName];
  }

  get_all_typeA_names() {
    return Object.keys(this.dict_typeA);
  }

  /**
   * Update a typeA object's name inside this TypeF object
   * 
   * @param {str_oldName} : Old name of the typeA folder you want to change
   * @param {str_newName} : New name of the typeA folder you want to change
   * 
   * @throws Error if the TypeA folder name is empty
   * @throws Error if the old TypeA folder name doesn't exist
   * @throws Error if the new TypeA folder name already exists
   */
  update_typeA_name(str_oldName, str_newName) {
    if (str_newName === "")
      throw new Error("TypeA folder name cannot be empty");

    if (!this.dict_typeA[str_oldName])
      throw new Error(`TypeA folder with name "${str_oldName}" doesn't exist`);
    
    if (this.dict_typeA[str_newName])
      throw new Error(`TypeA folder with name "${str_newName}" already exists`);

    this.dict_typeA[str_newName] = this.dict_typeA[str_oldName];
    delete this.dict_typeA[str_oldName];
  }
  
  delete_typeA(str_typeAName) {
    delete this.dict_typeA[str_typeAName];
  }

  clear_folder() {
    this.array_typeA = {};
  }
}
