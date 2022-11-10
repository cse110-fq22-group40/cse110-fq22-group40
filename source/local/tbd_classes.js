// if (localStorage.notes) {
//     const notes = JSON.parse(localStorage.notes);

//     // Loop through notes and display them on screen
//     for (const timestamp in notes)
//         displayNote(timestamp, notes[timestamp]);
// }

// function: the_brown_cow
// classes: StartWithUpper (camel)
// objects: camelCase
// data: str_hungarianCamel
import * as utils from './utils.js';

export class AudioObject {
    /**
    *AudioObject is a container for the path to the audio file
    *and the dictionary of notes
    *TBD: Connection to localstorage and updating contents
    *
    *@param {str_name} Name of Audio (TBD)
    *@param {str_path} path to audio file
    */
    constructor(str_name, str_path, ) {

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

class TypeA {
    /**
    *TypeA is a container for a group of audio objects
    *TODO: Connection to localstorage and updating contents
    *
    *@param {str_name} Name of Folder
    */
    constructor(str_name) {
        //Dict of AudioObject {"name" : AudioObject}
        this.dict_audio = {};
        this.str_name = str_name;
    }

    update_name(str_newName) {
        this.str_name = str_new_name;
    }

    get_audio_obj(str_audioObjName) {
        return this.dict_audio[str_audioObjName];
    }
    
    // NOTE: we may want this to take a JSON from a form instead
    add_audio_obj(obj_audio) {
        this.dict_audio[obj_audio.name] = obj_audio;
    }
    
    // use JSON from form to update the audio object
    update_audio_obj (str_audioObjName, str_newDataJSON) {
        
    }
    
    //TODO
    delete_audio_obj(obj_audio) {

    }

    clear_folder() {
        this.dict_audio = {};
    }

    //TODO
    save_folder (str_path) {
        utils._save_at_path(str_path, this)
    }
}

class TypeF {
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

    update_name(str_newName) {
        this.str_name = str_newName;
    }

    get_typeA_obj(str_typeAName) {
        return this.dict_typeA[str_typeAName];
    }
    
    add_typeA_obj(obj_typeA) {
        this.dict_typeA[typeA_obj.name] = typeA_obj;
    }
    
    //TODO
    delete_audio_obj(obj_typeA) {

    }

    clear() {
        this.array_typeA = {};
    }

    /**
    *Saves the typeF folders for the whole application, will
    *need to call get typeF folder function to save. No
    *input but might change to method in future.
    *
    *@param none
    *@return returns true if successfully, false othewise
    */
    save() {

    }
}
