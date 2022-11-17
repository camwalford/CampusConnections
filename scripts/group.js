function displayGroup() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid, " is logged in");
      currentUserID = user.uid;

      let cardTemplate = document.getElementById("activityTemplate");
      console.log(currentUserID);
      var currentGroupRef = db
        .collection("users")
        .doc(currentUserID)
        .get()
        .then((doc) => {
          console.log(doc.data().currentGroup);
          var currentActivity = db
            .collection("activities")
            .doc(doc.data().currentGroup)
            .get()
            .then((snap) => {
              console.log(snap.data());

              var title = snap.data().title;
              var activityType = snap.data().activityType;
              var activityID = snap.id; //gets the unique id for the activity
              var building = snap.data().building;
              var participants = snap.data().participants;
              var description = snap.data().description;
              console.log("id is "+ activityID);

              let newcard = cardTemplate.content.cloneNode(true);

              //update title and text and image
              newcard.querySelector(".card-title").innerHTML = title;
              newcard.querySelector(".card-text").innerHTML =
                "type: " +
                activityType +
                "<br/>building: " +
                building +
                "<br/>participants: " +
                participants +
                "<br/>description: " +
                description;

              newcard.querySelector("a").onclick = () => leaveGroup(activityID);

              document
                .getElementById("activities-go-here")
                .appendChild(newcard);
            });
        });

      //return user.uid;
    } else {
      console.log("no one is logged in");
    }
  });
}

function leaveGroup(id) {
  var currentUserRef = db.collection("users").doc(currentUserID);
  var ActivityRef = db.collection("activities").doc(id);

  console.log("uid of current user is" + currentUserID);
  console.log("uid of activity is " + id);

  //TODO currently joining a group succesfully increases the participants, leaving a group does not decrease
  // currentActivityRef.update({
  //     currentParticipants: firebase.firestore.FieldValue.increment(-1),
  // })
  currentUserRef.update({
    currentGroup: "none",
  });

  ActivityRef.update({
    currentParticipants: firebase.firestore.FieldValue.increment(-1),
  })
  .then(() => {
    window.open("activities.html", "_self");
  });
}

displayGroup();
