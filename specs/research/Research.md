# Research 
Team: Lithub

## Similar Apps

### Sound Cloud

Similarities:

- Comment on specific timestamps
- Music playing option
- Music upload

Differences

- Our product focuses on the individual user and local first instead of being a social platform


### MuseScore

Similarities:
- Target audience is musicians
- Annotate specific parts in pieces

Differences:
- Our product will not have features to create sheets, only audio option

### Audio Note

Similarities:
- App used to take notes linked to audio
- Audio upload
- Time stamps
  
Differences:
- Their product does not have rich text editor
- Their product can hand draw notes
- Our product does not need to separate audio clips for every note
- Our product will be more music geared

General App information:
- Price is $12.99
- Rated 4.1/5 with 90 review ratings in the app store
- Apple App for iphone & ipads

Good Reviews(Real Reviews):
- Audio in app, record and take notes at the same time
- Easily imported pictures & graphics
- Only note taker that can place audio notes right where your writing
  
Bad Redviews(Real Reviews):
- Problems: stops audio note recording and doesn't automatically resume when switching apps that use mircophone. Caused lost recording.
- Having one long recording doesn't help, app requires audio to be broken up before hand to take notes

## Feature Research

### Search Bar Feature

Search Bar Benefit Analysis [3.5/5]

- The search bar is a feature whose benefit to the project would scale very well with the introduction of related sorting features. That is, if we were to attach certain tags to the audio object, such as composer or date, the search bar would be of much use to the user as they could sort by said tag. However, if we were to stick to a basic organizational structure that's purely defined by the user through folder structure nesting, the search bar would only marginal help speed up the searching process for the user.

Search Bar Cost/Time Analysis [3.5/5]

- To start off, we would have to be able to store the names of each file into a pseudo-database that the search bar could use to query results. Realistically, we would probably only implement a “search-by-substring” approach, as the implementation of complex autocomplete/prediction algorithms would take too much time. The substring approach can be somewhat easily implemented using builtin Javascript functions such as getElementByID to search the pseudo-database for the user inputted substring.

### Audio Visualization/Scrubbing Feature

Audio Visualization/Scrubbing Benefit Analysis [4/5]

- The ability to see the peaks and dips in the pure audio file so that we could more precisely allow the user to scrub through the audio recording would be of great use for setting more precise timestamps, if we are to implement that feature, and to simply rewind through the audio so that they can replay a certain portion of the audio recording. Plus, it adds a nice visual flair to the application.

Audio Visualization/Scrubbing Cost Analysis [2/5]

- HTML or Javascript does not have a bundled and comprehensive way to approach this feature, and we would probably have to rely on the usage of web APIs to handle this for us in terms of providing the waveform visualization. The slider portion of this wouldn’t actually be as bad, as we could rely on mostly HTML in terms of implementation, but it is still time consuming.

### Rich Text Editor Feature

Rich Text Editor Benefit Analysis [4/5]

- The ability to give the user more functionality when they are taking notes. It would serve to give users more features when they are taking notes, and shortcuts to doing certain things when typing. It would enhance our product’s organizational oriented goal by giving users this ability. Yet, if we have a plain text editor it would go the job just as well, rich text editor just enhances this part of the app.

Rich Text Editor Cost/Time Analysis[3.5/5]

- It seems like it is not too horrible to implement this type of feature into the app but based on how “rich” we want it, it would just take time to implement. HTML and Javascript have some ways to approach this problem, so that would help us a lot in trying to create it. The only thing is we would just have to continue to add to the attributes for the editor for it to be “rich” which does take up some time. And in the scope of the project not sure if we would be able to completely finish it.

### Moving Files/Folders into other Files/Folders

Moving Files/Folders into other Files/Folders Benefit Analysis[2.75/5]

- The ability to give the users more options in being organized while using the application. It serves to allow the user to be less constricted when it comes to where they are putting things, because they know if they mess up they can always move things around if needed. However our application can work fine without this feature and doesn’t need to be able to move files/folders around in order to take care of its goal. It would just be an added layer of mobility when using the application.

Moving Files/Folders into other Files/Folders Benefit Analysis[3.5/5]

- The degree of difficulty of this feature depends on how we are storing all our files in our code. If we do it in a way where everything is nested through layers, aka parent - child relationships, we could have a separate javascript function in order to change whatever file/folder’s parent to its new parent. Then we would in this same function have code that is able to change the frontend of how that looks as well, to reload the page or something like that. However we would need this to be a button for the minimum degree of difficulty since dragging around elements on the page would be much more complex to build.
