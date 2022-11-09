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
    constructor(str_name, str_path, ) {

        this.str_path = str_path;
        
        // {"timestamp" : "text"}
        this.notes = {};
    }

    get_audio_file

    update_path(str_newPath) {
        this.str_path = str_newPath;
    }

    get_note(str_timestamp) {
        return this.notes[str_timestamp];
    }

    add_note(str_timestamp, str_note) {
        this.notes[str_timestamp] = str_note;
    }
    
    delete_note(str_timestamp) {
        delete this.notes[str_timestamp];
    }

    clear_notes() {
        this.notes = {};
    }
}

class TypeA {
    constructor(str_name) {
        //Array of AudioObject
        this.dict_audio = {};
        this.str_name = str_name;
    }

    update_name(str_newName) {
        this.str_name = str_new_name;
    }

    get_audio_obj(str_audioObjName) {
        return this.dict_audio[str_audioFileName];
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
        this.dict_audio = [];
    }

    //TODO
    save_folder (str_path) {
        utils._save_at_path(str_path, this)
    }
}

class TypeF {
    constructor(str_name) {
        this.str_name = str_name;
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

    //TODO
    save() {

    }
}
