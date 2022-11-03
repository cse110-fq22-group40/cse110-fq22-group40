# 11/2 Meeting Notes

Created By: Grace Jin </br>
Date: November 2, 2022 </br>
Location: CSE Basement </br>
Participants: Grace Jin, Katherine Wong, Bennett Zhang, Ben Snowbarger, Alex Wu, Ernest Lin, Kevin Truong, Emmanuel Serrano, Billy Sudirdja, Ryan Truong </br>
Type: Weekly Sync </br>

# Agenda

- General: code a plain version of the app

## Procedures it took

- Team splited to research on saving files in javascript
    - Several possible solutions
        - Filesaver
        - IndexDB
        - Object URL (Kevin)
- Continue discussing
    - Text editing
        - MongoDB
        - LocalStorage
            - try local Storage (YAY Ben)
                1. Get the timestamp of the currently displaying audio
                2. Create a note string and add it to the current timestamp, and merge the string to the json object after the user hit submit
                3. convert the json object back to string to use local storage (can only store string)
                4. when the website reload, detect if local storage has files and loop through the string to display each note with the according key(timestamp)
        - Building unit test
            - test by function
    - audio saving
        - Object URL
            - test Object URL, try local storage, can save file path successfully
            - try encode the audio to base 64, but with the size limitation of LocalStorage…
        - Blob
        - Local Storage
            - convert the audio file to text file with base 64 string
            - save it to the localstorage
            - indicate the audio source to the audio file when reload and open the text-editor
        
    

Some researches docs:

[How Do I Use to save the uploaded to a javascript variable?](https://stackoverflow.com/questions/57048260/how-do-i-use-input-to-save-the-uploaded-to-a-javascript-variable)

[Using files from web applications - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)

[FileReader - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/FileReader)

<aside>
😈 Make sure to discuss the *why* for decisions made and dissenting opinions!

</aside>

# What carries over from last week?

- Nothing

# What are we doing this week?

- Implementing a simple version of the app

# Potential blockers?

- Nothing

# Action items

- [ ]  Ask Allison about unit testing frameworks
- [ ]  Ask Allison about using database api calls/ languages to store files in the future
- [ ]  Keep updating on Ben’s repo and push his to the main repo later

## For Next Week’s Agenda:

1. Continue researching on ways to save the audio file

## Meeting Duration:

<aside>
⏱️ Record 7:00 → 9:00.

</aside>