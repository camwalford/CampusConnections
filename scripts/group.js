function displayGroup() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid, " is logged in");
      currentUserID = user.uid;

      let cardTemplate = document.getElementById("groupTemplate");
      console.log(currentUserID);
      var currentGroupRef = db
        .collection("users")
        .doc(currentUserID)
        .get()
        .then((doc) => {
          console.log(doc.data().currentGroup);
          var currentGroup = db
            .collection("groups")
            .doc(doc.data().currentGroup)
            .get()
            .then((snap) => {
              console.log(snap.data());

              var title = snap.data().title;
              var groupType = snap.data().groupType;
              var groupID = snap.id; //gets the unique id for the group
              var building = snap.data().building;
              var participants = snap.data().participants;
              var description = snap.data().description;
              console.log("id is "+ groupID);

              let newcard = cardTemplate.content.cloneNode(true);

              //update title and text and image
              newcard.querySelector(".card-title").innerHTML = title;
              newcard.querySelector(".card-text").innerHTML =
                "type: " +
                groupType +
                "<br/>building: " +
                building +
                "<br/>participants: " +
                participants +
                "<br/>description: " +
                description;

              newcard.querySelector("a").onclick = () => leaveGroup(groupID);

              document
                .getElementById("groups-go-here")
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
  var GroupRef = db.collection("groups").doc(id);

  console.log("uid of current user is" + currentUserID);
  console.log("uid of group is " + id);

  //TODO currently joining a group succesfully increases the participants, leaving a group does not decrease
  // currentGroupRef.update({
  //     currentParticipants: firebase.firestore.FieldValue.increment(-1),
  // })
  currentUserRef.update({
    currentGroup: "none",
  });

  GroupRef.update({
    currentParticipants: firebase.firestore.FieldValue.increment(-1),
  })
  .then(() => {
    window.open("groupsList.html", "_self");
  });
}

displayGroup();
