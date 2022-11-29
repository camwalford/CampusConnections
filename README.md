## Campus Connections

* [General info](#general-info)
* [Technologies](#technologies)
* [Contents](#content)

## General Info
This is a browser based web application that allows the users to create and join groups with others pn the BCIT campus. 
Some prominent features include: clicking on areas of the map to automatically sort through the list of current groups,
creating your own group with a specified title, group-type, location, time, description and number of participants,
customizing your profile name and image, and sending chats to people in your current group.

* Hello my name is Brendan. I'm excited about this project because I can get hands on experience.

* hello my name is keagan and i'm excited to learn github as a team and explore the possiblities of our project together :)

* Hi my name is Cameron. I'm excited about this project because having practical experience making a web application will be very beneficial to my future endeavours as a developer
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap 
* ...
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore               # Git ignore file
├── index.html               # landing HTML file, this is what users see when you come to url
├── login.html               # landing HTML file, this is what users see when you come to url
├── map.html                 # landing HTML file, this is what users see when you come to url
├── group.html               # landing HTML file, this is what users see when you come to url
├── groupList.html           # landing HTML file, this is what users see when you come to url
├── profile.html             # landing HTML file, this is what users see when you come to url
├── createGroup.html         # landing HTML file, this is what users see when you come to url
├── index.html               # landing HTML file, this is what users see when you come to url
├── 404.html                 # Firebase hosting 404 page
└── README.md

It has the following subfolders and files:
├── .git                     # Folder for git repo
├── images                   # Folder for images
    /locations               # Subfolder for location images displayed on map hover
        /dorms.png           # dorms
        /NE1.png             # NE1
        /NE821.png           # NE821
        /NE912.png           # NE912
        /NE2820.png          # NE2820
        /NW.png              # NW
        /SE1.png             # SE1
        /se2.png             # SE2
        /se4.png             # SE4
        /se6.png             # SE6
        /SE8.png             # SE8
        /se10.png            # SE10
        /SE12.png            # SE12
        /SE14.png            # SE14
        /SE16.png            # SE16
        /SW.png              # SW
        /SW9.png             # SW9
        /Track.png           # Track
    tutorial                 # Subfolder for tutorial images
        /createtut.png       # Create group tutorial image
        /grouptut.png        # Current group tutorial image
        /listtut.png         # Group List tutorial image
        /maptut.png          # Map tutorial image
        /profiletut.png      # Profile tutorial image
    /BCIT-Map2-LowOp.png     # Low opacity map for background
    /BCIT-Map2.jpg           # Main Map image
    /CCLogo.png              # Logo
    /defaultpfp.jpg          # default profile picture
    /favicon.ico             # favicon
    /searchicon.png          # Search icon for searchbar in groupList.html
    /students-wallpaper.png  # Background image for index.html blurred
    /students-wallpaper.jpg  # Background image for index.html

├── scripts                  # Folder for scripts
    /authentication.js       # firebase authentication
    /chat.js                 # chat functions for group.html
    /clearGroups.js          # functions for clearing current groups
    /createGroups.js         # functions for creating groups and form validation
    /exitButton.js           # function for exit buttons on each page
    /firebaseAPI_TEAM26.js   # firestore scripts
    /group.js                # functions for group.html
    /groupsList.js           # functions for groupList.html
    /header.js               # functions for displaying profile picture in header.
    /map.js                  # functions for tutorial and map interactions.
    /profile.js              # function for displaying profile and changing profile.
    /script.js               # function for getting currently logged in user.
    /skeleton.js             # function for displaying header and bottom nav on each page.
    /toMap.js                # function for going back to map on background click.

├── styles                   # Folder for styles
    /style.css               # Main stylesheet
    /createGroupStyle        # create group stylesheet
    /groupStyle.css          # group stylesheet
    /indexStyle              # index stylesheet
    /loginStyle              # login stylesheet
    /mapStyle.css            # map stylesheet
    /profileStyle            # profile stylesheet
    /groupListStyle          # group list stylesheet
    /font                    # Subfolder for fonts
                    
├── text                     # Folder for styles
    /header.html             # html loaded in for header on each page
    /nav.html                # html loaded in for bottom navbar on each page

Firebase hosting files: 
├── .firebaserc              # Firebase hosting files
├── .firebase.json           # Firebase hosting files
├── firestore.indexes.json   # Firebase hosting files
├── firestore.rules          # Firebase hosting files
├── package-lock.json        # Firebase hosting files
├── package.json             # Firebase hosting files
├── storage.rules            # Firebase hosting files


```

Tips for file naming files and folders:
* use lowercase with no spaces
* use dashes (not underscore) for word separation

