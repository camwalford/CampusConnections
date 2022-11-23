function displayCards(collection) {
  let accordionTemplate = document.getElementById("groupTemplate");

  db.collection(collection)
    .get()
    .then((snap) => {
      snap.forEach((doc) => {
        //iterate thru each doc

        var title = doc.data().title; // get value of the "name" key
        var groupType = doc.data().groupType; // get value of the "details" key
        var groupID = doc.id; //gets the unique id for the group
        var building = doc.data().building;
        var startTime = doc.data().starttime;
        var endTime = doc.data().endtime;
        var participants = doc.data().participants;
        var CurrentParticipants = doc.data().currentParticipants;
        var description = doc.data().description;

        var currentTime = new Date();

        var groupID = doc.id; //get unique ID to each hike to be used for fetching right image
        let newAccordion = accordionTemplate.content.cloneNode(true);

        if(startTime.toDate().getHours() > 12) {
          startTime = startTime.toDate().getHours()-12 + ":" + startTime.toDate().getMinutes()+"pm";
        } else {
          startTime = startTime.toDate().getHours()-12 + ":" + startTime.toDate().getMinutes()+"am";
        }

        if(endTime.toDate().getHours() > 12) {
          end = endTime.toDate().getHours()-12 + ":" + endTime.toDate().getMinutes()+"pm";
        } else {
          end = endTime.toDate().getHours()-12 + ":" + endTime.toDate().getMinutes()+"am";
        }

        //update title and text and image
        newAccordion.querySelector(".accordion-title").innerHTML = title;
        newAccordion.querySelector(".accordion-type").innerHTML = groupType;
        newAccordion.querySelector(".accordion-time").innerHTML = startTime + " - " + end;
        newAccordion.querySelector(".accordion-building").innerHTML = building;
        newAccordion.querySelector(".accordion-participants").innerHTML =
          CurrentParticipants + "/" + participants;
        newAccordion.querySelector(".accordion-description").innerHTML =
          description;

        newAccordion.querySelector("a").onclick = () => joinGroup(groupID);

        //delete the file if the time is up or if there are no participants
        //console.log(endTime.toDate() + " : " + currentTime);
        if (endTime.toDate() < currentTime || CurrentParticipants < 1) {
          db.collection(collection).doc(groupID).delete();
        } else {
          //attach to gallery
          document
            .getElementById(collection + "-go-here")
            .appendChild(newAccordion);
        }
      });
    });
}

function joinGroup(id) {
  var currentUserRef = db.collection("users").doc(currentUserID);
  var joiningGroupRef = db.collection("groups").doc(id);

  var currentGroupRef = db
    .collection("users")
    .doc(currentUserID)
    .get()
    .then((doc) => {
      var currentGroup = db
        .collection("groups")
        .doc(doc.data().currentGroup)
        .get()
        .then((snap) => {
          //implement something to check if you try to join the group you're already in, it currently breaks it
          console.log("snap.data() " + snap.id);
          console.log("joiningActivitiyRef " + id);
          if (snap.id == id) {
            alert("no joining the group you're already in");
          } else if (snap.id = "undefined") {
            console.log("snap.id is undefined");
            joiningGroupRef.update({
              currentParticipants: firebase.firestore.FieldValue.increment(1),
            });
            currentUserRef
              .update({
                currentGroup: id,
              })
              .then(() => {
                window.open("group.html", "_self");
              });
          } else {
            //snap.data().currentParticipants = 1;
            db.collection("groups")
              .doc(doc.data().currentGroup)
              .update({
                currentParticipants: snap.data().currentParticipants - 1,
              });

            joiningGroupRef.update({
              currentParticipants: firebase.firestore.FieldValue.increment(1),
            });
            currentUserRef
              .update({
                currentGroup: id,
              })
              .then(() => {
                window.open("group.html", "_self");
              });
          }
        });
    });

  // console.log("uid of current user is" + currentUserID);
  // console.log("uid of group is " + id);
  // console.log("uid of previous group is " + currentUserRef.currentGroup);

  //TODO currently joining a group succesfully increases the participants, leaving a group does not decrease
  // currentGroupRef.update({
  //     currentParticipants: firebase.firestore.FieldValue.increment(-1),
  // })
}

displayCards("groups");
