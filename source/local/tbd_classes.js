// if (localStorage.notes) {
//   const notes = JSON.parse(localStorage.notes);

//   // Loop through notes and display them on screen
//   for (const timestamp in notes)
//     displayNote(timestamp, notes[timestamp]);
// }

// function: the_brown_cow
// classes: StartWithUpper (camel)
// objects: camelCase
// data: str_hungarianCamel

export class AudioObject {
  /**
  *AudioObject is a container for the path to the audio file
  *and the dictionary of notes
  *TODO: functions for accessing and changing audio path
  *
  *@param {str_name} Name of Audio (TBD)
  *@param {str_path} path to audio file
  */
  constructor(str_path, ) {
    this.str_path = str_path;
      
    // {"timestamp" : "text"}
    this.notes = {};
  }

  /** TBD
  *Getter for audio file
  *
  *@return Audio file
  */
  get_audio_file() {
    //TBD
  }

  /** 
  *Updates path to audio file
  *@param {str_newPath} New path to audio file
  *
  *@return none
  */
  update_path(str_newPath) {
    this.str_path = str_newPath;
  }

  /** 
  *Getter for all the notes
  *
  *@return Note
  */
  get_notes() {
    return this.notes;
  }

  /** 
  *Getter for specific note given a timestamp
  *@param {str_timestamp} Timestamp of the note
  *
  *@return Note
  */
  get_note(str_timestamp) {
    return this.notes[str_timestamp];
  }

  /** 
  *Add specific note with a timestamp
  *@param {str_timestamp} Timestamp of the note
  *@param {str_note} The note
  *
  *@return None
  */
  add_note(str_timestamp, str_note) {
    this.notes[str_timestamp] = str_note;
  }
  
  /** 
  *Deletes note given timestamp
  *@param {str_timestamp} Timestamp of the note
  *
  *@return None
  */
  delete_note(str_timestamp) {
    delete this.notes[str_timestamp];
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
  *TypeA is a container for a group of audio objects
  *TODO: Connection to localstorage and updating contents
  *
  */
  constructor() {
    //Dict of AudioObject {"name" : AudioObject}
    this.dict_audio = {};
  }

  /**
   * Update an AudioObj name inside this TypeA object
   * 
   * @param {str_oldName} : old name of the AudioObj you want to change
   * @param {str_newName} : new name of the AudioObj you want to change
   */
  update_audio_name(str_oldName, str_newName) {
    let obj_audio = this.dict_audio[str_oldName]
    delete this.dict_audio[str_oldName];

    this.dict_audio[str_newName] = obj_audio;
  }

  get_audio(str_audioObjName) {
    return this.dict_audio[str_audioObjName];
  }
  
  // NOTE: we may want this to take a JSON from a form instead
  add_audio(str_name, str_path) {
    this.dict_audio[str_name] = new AudioObject(str_name, str_path);
  }
  
  // use JSON from form to update the audio object
  update_audio(str_audioObjName, str_newDataJSON) {

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
  *TypeF is a container for a group of TypeA objects
  *TODO: Connection to localstorage and updating contents
  *
  *@param {str_name} Name of Folder
  */
  constructor(str_name) {
    this.str_name = str_name;
    //{"name" L typeA}
    this.dict_typeA = {};
  }

  /**
   * Update a typeA object's name inside this TypeF object
   * 
   * @param {str_oldName} : old name of the typeA folder you want to change
   * @param {str_newName} : new name of the typeA folder you want to change
   */
  update_typeA_name(str_oldName, str_newName) {
    let obj_typeA = this.dict_typeA[str_oldName];
    delete this.dict_typeA[str_oldName];
    this.dict_typeA[str_newName] = obj_typeA;
  }

  get_typeA(str_typeAName) {
    return this.dict_typeA[str_typeAName];
  }
  
  add_typeA(str_name) {
    this.dict_typeA[str_name] = new TypeA(str_name);
  }
  
  delete_typeA(str_typeAName) {
    delete this.dict_typeA[str_typeAName];
  }

  clear() {
    this.array_typeA = {};
  }

  // /**
  // *Saves the typeF folders for the whole application, will
  // *need to call get typeF folder function to save. No
  // *input but might change to method in future.
  // *
  // *@param none
  // *@return returns true if successfully, false othewise
  // */
  // save() {

  // }
}
