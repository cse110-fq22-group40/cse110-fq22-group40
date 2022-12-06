# Master Note 11/16

Date: December 16, 2022 <br>
<br>
Participants: Emmanuel Serrano, Katherine Wong, Grace Jin, Bennett Zhang, Ben Snowbarger, Alex Wu, Ernest Lin, Kevin Truong, Billy Sudirdja, Ryan Truong, Sailor Eichhorn<br>
<br>
Type: Weekly Sync <br>
## Location and Time:

<aside>
⏱️ 7:00 → 7:45

</aside>

- Planned to be about 30-45 minutes long

## Expected Attendees:

- Everyone Except Bennett and Sailor
- They may join on the zoom we will during the meeting
    
    ### Zoom Link
    
    [https://us05web.zoom.us/j/2713094939?pwd=WjM4UnEyOG02V1pPc251S2hkZFkvdz09](https://us05web.zoom.us/j/2713094939?pwd=WjM4UnEyOG02V1pPc251S2hkZFkvdz09)
    
    Meeting ID: 271 309 4939
    Passcode: ENTER
    

## On the Agenda:

1. Introduction
2.  Goal ONE:
    - Complete as soon as possible (Hard Deadline - Sunday)
    - Have a working product in Main branch
        - page where you can upload audio files
        - when you click the audio, a page to create notes
        - all delete for those objects functioning with UI
        - all updates functioning with UI
        - updated README, Documentation, and Unit Testing
3. Sprint Planning:
    - Finish Goal ONE
    - Backend Goals
        - I know basically done
        - However should discuss system IO
    - Talk FrontEnd Goals
    - QA Goals
4. Attack Plan
    - Ask every team how they want to attack each of their goals, so that there is a general structure to how everything will be completed during this sprint
5. Dismissal
    - Meeting is technically over, however groups are welcome to continue working on their own time.
    - Sprint has officially begin, so let’s just get to work!

## What Happened

- Everyone was informed about our video deadline which is due by next week
- However we are currently trying to finish everything code related including testing and documentation by Sunday for the video assignment
- So basically we have two parts of our sprint, the part leading up to Goal ONE and the part after Goal ONE

### Main Thing(Goal ONE)

We want to be able the note taking aspect of our application implemented and then we can shift to unit testing and documentation for Sunday's deadline.

### 2nd Sprint Conversation

Backend

(Before Goal ONE)

- Work closely with Front-end to complete the goal ONE
- Then we will shift focus to help with documentation, unit testing, or where ever we need help for Sunday deadline

(After Goal ONE)

- Work closely with Front-end to help implement the deleting and updating aspects of the application

Frontend

(Before Goal ONE)

- Work closely with Back-end to complete the goal ONE
- Then we will shift focus to help with documentation, unit testing, or where ever we need help for Sunday deadline.

(After Goal ONE)

- Work closely with Back-end to help implement the deleting and updating aspects of the application

QA 

(Before Goal ONE)

- Work on writing more Unit Test and Documentation

(After Goal One)

- Continue to write more Unit Test and Documentation for the incoming code that comes after Goal ONE

## Attack Plan

- Every Group was should plan when to meet and work next
- Once each group found out when they were going to meet, they should post on their slack channels in case anyone else wanted to know
- Goal of keeping communicate going as a team and work together to get this next sprint done

### Comments:

Bennet Comments from Zoom:

- The audio file input form from front-end returns an absolute path
- In back-end, we are saving the relative path of the audio file
So the update_audio_path function uses the “path” module to convert the absolute path to a relative path
- And the get_audio_path function uses the “fs” module to make sure that the audio path actually exists
- The update_audio_path function also uses the “fs” module for the same purpose; to make sure that the audio path is valid
    
    

Why we using Relative Path

- The absolute path breaks whenever the user renames a folder, plus it takes up a lot of storage space
- The relative path is more robust, meaning it is less likely to break, and it also takes up much less space in LocalStorage