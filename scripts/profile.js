function displayProfile() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var userName = userDoc.data().name;
        var userEmail = userDoc.data().email;
        let picUrl = userDoc.data().profilePic; 

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("username").value = userName;
        }
        if (userEmail != null) {
          document.getElementById("email").value = userEmail;
        }
        if (picUrl != null) {
          //console.log(picUrl);
          // use this line if "mypicdiv" is a "div"
          //$("#mypicdiv").append("<img src='" + picUrl + "'>")
          $("#mypic-goes-here").attr("src", picUrl);
        } else console.log("picURL is null");
      });
    } else {
      console.log("no one is logged in");
    }
  });
}

var ImageFile; //global variable to store the File Object reference

function chooseFileListener() {
  const fileInput = document.getElementById("mypic-input"); // pointer #1
  const image = document.getElementById("mypic-goes-here"); // pointer #2

  //attach listener to input file
  //when this file changes, do something
  fileInput.addEventListener("change", function (e) {
    //the change event returns a file "e.target.files[0]"
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);

    //change the DOM img element source to point to this file
    image.src = blob; //assign the "src" property of the "img" tag
  });
}

function edit() {
  document.getElementById("personalInfoFields").disabled = false;
}

function save() {
  document.getElementById("personalInfoFields").disabled = true;
  firebase.auth().onAuthStateChanged(function (user) {
    var storageRef = storage.ref("images/" + user.uid + ".jpg");

    //Asynch call to put File Object (global variable ImageFile) onto Cloud
    storageRef.put(ImageFile).then(function () {
      console.log("Uploaded to Cloud Storage.");

      //Asynch call to get URL from Cloud
      storageRef.getDownloadURL().then(function (url) {
        // Get "url" of the uploaded file
        console.log("Got the download URL.");
        //get values from the from
        userName = document.getElementById("username").value; //get the value of the field with id="nameInput"
        userEmail = document.getElementById("email").value; //get the value of the field with id="schoolInput"

        //Asynch call to save the form fields into Firestore.
        db.collection("users")
          .doc(user.uid)
          .update({
            name: userName,
            email: userEmail,
            profilePic: url, // Save the URL into users collection
          })
          .then(function () {
            console.log("Added Profile Pic URL to Firestore.");
            console.log("Saved use profile info");
            document.getElementById("personalInfoFields").disabled = true;
          });
      });
    });
  });
}

function logout() {
  console.log("logging out user");
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      window.location.href = "index.html";
    })
    .catch((error) => {
      // An error happened.
    });
}

chooseFileListener();
displayProfile();
