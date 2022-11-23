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

        //if the data fields are not empty, then write them in to the form.
        if (userName != null) {
          document.getElementById("username").value = userName;
        }
        if (userEmail != null) {
          document.getElementById("email").value = userEmail;
        }
      });
    } else {
      console.log("no one is logged in");
    }
  });
}

function edit() {
  document.getElementById("personalInfoFields").disabled = false;
}

function save() {
  userName = document.getElementById("username").value; //get the value of the field with id="nameInput"
  userEmail = document.getElementById("email").value; //get the value of the field with id="schoolInput"

  currentUser
    .update({
      name: userName,
      email: userEmail
    })
    .then(() => {
      console.log("Document successfully updated!");
    });
  document.getElementById("personalInfoFields").disabled = true;
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

displayProfile();
