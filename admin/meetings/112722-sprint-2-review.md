# Sprint Review 11/27

Date: November 27, 2022 <br>
Location: Zoom <br>
Participants:
Sailor Eichhorn, Grace Jin, Bennett Zhang, Ben Snowbarger, Alex Wu, Emmanuel Serrano, Ryan Truong, Billy Sudirdja <br>
Type: Sprint Review Meeting <br>

Sprint Review Video Available in Notion

[Video Link To Notion](https://www.notion.so/Sprint-2-Review-11-27-edacb555c1f14117be27da8148bca3b2)

## Video

## Back End

- remains stable from last sprint
- implementing error handling for edge cases in backend to add security
- implemnting more documentation on to code that already existed
- new path implementation to show the directory to the user
- working on rename and delete support
  - currently working on a right click feature where, for a sub menu where user can choose to either rename or delete
  -

### Workflow

- Some mob programming
- Mostly Individual programming

## Front End

- rename and delete pop-up for each object
  - using context menu working with backend
  - not quite working but, it is noted functionality needs work in the upcoming sprint
- implementing UI for allowing the location of a note to be changed by the user
- many bugs killed
  - disabled empty file names and a character limit for file names
  - currently addressing note container edge cases for long notes and handling
- Audio files now have attachable notes we can assign
  - However Quill editor being worked on so we have a rich text editor
- Color changes to the application
- overall more work as deciated to working on edge case handling

### Workflow

- Some Mob programming
- Some Individual programming

## QA

- CI/CD pipeline workflow is being streamlined
- new branch protections
- going through PR to be able to test them locally
- end to end testing being worked on this sprint
- [README.md](http://README.md) is now outlined and being worked on for complete documentation
  
## Refractor

- The latter part of the sprint was given to this refractor we did of our github
- We changed the way the code was organized 
- We change the CI/CD pipeline workflow in github and github actions
- We put a pause on all new coding and PR so this could be put together for a couple of days

## Demo

- We demo our pipeline and new app features in the meeting for everyone to see

### New Pipeline
- We now run our pipeline through github issues
  - We make issues, using a simple issue template we created in the github
  - Each issues is for a different feature or bug or documentation task that need to be complete
  - Any team member can assign the issue to themselves to be able to start working on the problem
  - Once they assign the issue to themselves, they go through the process of creating a new branch for that specific issue
  - On this branch they working on what issue they checkout and once they feel it is complete they push it onto our staging branch, where before merging it gets review by two team members who make sure the merge will be okay and if not they will send the code back
  - Then every couple of days we trying to push everything on the staging branch onto the main branch
- So overall this is the pipeline workflow we tried showing in our review meeting, and excited to start working in this matter 

### App Features 
- We also showed off our apps new features we implemented 
    - We were showing the completely new UI color switch up
    - Where now every page has a new color associated with it
    - Now we can go back on any page we are on as well just by using the arrow located on the top left of the page and use the lightbulb logo to take us all the way back to the "home" page
    - Then everytime you click a "file" to go to a new page we have a little animation that displays
    - Made this decision for the user to be able to distinguish where exactly they are in the application
    - We were able to show the path display so user can also visually see where they are in the application
    - Also able to show off our error handling 
    - Were we can not give files empty names
    - Were files names can only be certain length long
    - Were files can not have same names
    - Showed that we need to work on note length since the display for the is buggy
- So overall we happy with what we able to complete and like the new switch up our app is taking on 
  
## Overall 
We all happy with the work we were able to do during this second sprint. We maybe wish we were able to get more done by the end, however the refactor and other unforseened obstacles prevent us from doing so. However we still sticking to plan, practicing the agile method, and using software engineering principles to be able to complete our product by the end of the quarter.
