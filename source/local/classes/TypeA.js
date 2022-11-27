/**
 * This file defines the TypeA object. It contains the implementation for
 * creating a TypeA object and modifying a TypeA object. It has all the functions
 * that are necessary to manage the audioObjects contained in the TypeA object,
 * including the audioObject's name and audio file path.
 */

import {AudioObject} from "../imports.js";

/**
 * TypeA is a class for creating a TypeA object which contains a group of
 * audio objects. It also has all the funtions that manage those audio objects.
 */
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
	 * @return Audio Object
	 */
	get_audio(audioObjName) {
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
			throw new Error(`Audio file with name "${audioName}" doesn't exist`);
	
		delete this.dict_audio[audioName];
	}
	
	/**
	 * Clears all audio objects in this folder
	 */
	clear_folder() {
		this.dict_audio = {};
	}
}
