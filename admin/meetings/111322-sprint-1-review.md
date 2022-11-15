# Sprint Review 11/13

Date: November 13, 2022
Location: Zoom
Participants: Sailor Eichhorn, Grace Jin, Bennett Zhang, Ben Snowbarger, Alex Wu, Emmanuel Serrano, Ryan Truong, Billy Sudirdja
Type: Design and Planning

Sprint Review Video Available in Notion

## Front End

- Great amount of work was done for this sprint
- focused on this sprint on creating HTML to reflect the wireframes for a minimum viable product
- This includes animation and UI for the flow of uploading audio
- Integrated with backend to be able to upload from the computer file system and add a path
- After refreshing the page there is persistence on the audio
- Return to home feature
- Communicated with back end team so each part can play nice with each other
    
    ### Demo
    
    - Showed there font page design
    - Has our logo, which in future going to use to return to home page
    - upload button
    - audio component cards can be added
    - if paged refreshed audio component cards are still there

### Workflow

- Mob programming (team of three)
- Ryan teaching teaching Kevin and Alex more about front-end design
- Billy added the logo that appears on screen

## Back End

- Great amount of work was done doing this first sprint
- functions on backend for methods and class are in ultis.js
- code is very well documented
- error checking is starting to be added more to the functions
- communicated with front end team to make sure everything can be play nice together
- designed so functions can be called in try, catch blocks so front end can show visual errors if user tries to do something we do not want to allow
- ultis.js is how we have access to our storage, and we are currently for the meantime using local storage to save things.
- designed so if we want to change it so we are not using local storage, only code from the backend would have to change and all code from the front end can stay the same.
    
    ### Comments by Bennet on Github branches
    
    - git hub green check mark
        - means all checks have passed(details are good, styling is good)
        - can help Emmanuel and Sailor when they want to clean up code
    - professor added protection settings and wants code automation test, which need to pass before we push code to main
    - we should have one person dedicated to this take of task, basically as the guard of the main branch

## QA

### Automation

- Did a lot of conceptuality work during the sprint, more research heavy because wanted code first in-order to be able to do different testing and documentation with it.
- JSdocs, Jest, ESlint, Code climate to assist with pulling in merging
    - this is all for the benefit of keeping the codebase clean
    - have been researching tools for automation
- Unit Testing
    - writing over the weekend to be documented in CI/CD Pipeline

## Overall

We all happy and excited with the work we were able to do during this first sprint. Seems like we are well on our way to have a good product by the end of the quarter. Practicing the agile method and using software engineering principles.