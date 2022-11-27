function displayGroup() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log(user.uid, " is logged in");
      currentUserID = user.uid;

      let groupTemplate = document.getElementById("group-template");
      console.log(currentUserID);
      var currentGroupRef = db
        .collection("users")
        .doc(currentUserID)
        .get()
        .then((doc) => {
          console.log(doc.data().currentGroup);

          //Checks if user is in a group and displays the group information and chat if it's true.
          if (doc.data().currentGroup !== "none" && doc.data().currentGroup !== null) {
            var currentGroup = db
              .collection("groups")
              .doc(doc.data().currentGroup)
              .get()
              .then((snap) => {
                
                console.log(snap.data());
                if (typeof snap.data() !== 'undefined'){

                  var title = snap.data().title;
                  var groupType = snap.data().groupType;
                  var groupID = snap.id; //gets the unique id for the group
                  var building = snap.data().building;
                  var currentParticipants = snap.data().currentParticipants;
                  var maxParticipants = snap.data().participants;
                  var startTime = snap.data().starttime;
                  var endTime = snap.data().endtime;
                  var description = snap.data().description;
                  var startTime;
                  var endTime = snap.data().endtime;
                  console.log("id is " + groupID);


                startTime = startTime.toDate().toLocaleTimeString('en-US',
                  {timeZone:'PST',hour12:true,hour:'numeric',minute:'numeric'}
                );

                endTime = endTime.toDate().toLocaleTimeString('en-US',
                  {timeZone:'PST',hour12:true,hour:'numeric',minute:'numeric'}
                );


                  //endTime = endTime.toDate().getHours() + ":" + endTime.toDate().getMinutes();

                  let newGroup = groupTemplate.content.cloneNode(true);

                  //update title and text and image
                  newGroup.getElementById("group-title").innerHTML = title;
                  newGroup.getElementById("group-type").innerHTML = groupType;
                  newGroup.getElementById("group-building").innerHTML =
                    '<span id="pin" class="material-symbols-outlined">location_on</span>' +
                    building;
                  newGroup.getElementById("group-time").innerHTML =
                    '<span id="clock" class="material-symbols-outlined">schedule</span>' +
                    startTime +
                    " - " +
                    endTime;
                  newGroup.getElementById("group-participants").innerHTML =
                    '<span id="person" class="material-icons">person</span>' +
                    currentParticipants +
                    "/" +
                    maxParticipants;
                  newGroup.getElementById("group-description").innerHTML =
                    "Description: " + description;

                  document.querySelector("#leave").onclick = () =>
                    leaveGroup(groupID);

                  document.getElementById("groups-go-here").appendChild(newGroup);

                  var chat = document.getElementById("chat");
                  chat.style.display = "block";
                }
                else {
                  document.getElementById("currentGroupContainer").innerHTML =
                    '<div onclick="backToMap()" id="exitButton" class=" newButton">' +
                    '<span id="exitButton" class="material-symbols-outlined">close</span>' +
                    '</div><div id="noGroup"><p>You are not currently in a group.</p>' +
                    '<a id="noGroupLink" href="./groupsList.html">Find a new group here!</a></div>';
                }
              });
            //If user is not in a group, displays message and link to groupList page
          } else {
            document.getElementById("currentGroupContainer").innerHTML =
              '<div onclick="backToMap()" id="exitButton" class=" newButton">' +
              '<span id="exitButton" class="material-symbols-outlined">close</span>' +
              '</div><div id="noGroup"><p>You are not currently in a group.</p>' +
              '<a id="noGroupLink" href="./groupsList.html">Find a new group here!</a></div>';
          }
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
  }).then(() => {
    window.open("groupsList.html", "_self");
  });
}

displayGroup();

var modal = document.getElementById("leave-modal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};



