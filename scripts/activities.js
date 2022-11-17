function displayCards(collection) {
  let accordionTemplate = document.getElementById("activityTemplate");

  db.collection(collection)
    .get()
    .then((snap) => {
      //var i = 1;  //if you want to use commented out section
      snap.forEach((doc) => {
        //iterate thru each doc

        //delete the file if theres no one in it

        var title = doc.data().title; // get value of the "name" key
        var activityType = doc.data().activityType; // get value of the "details" key
        var activityID = doc.id; //gets the unique id for the activity
        var building = doc.data().building;
        var endTime = doc.data().endtime;
        var participants = doc.data().participants;
        var CurrentParticipants = doc.data().currentParticipants;
        var description = doc.data().description;

        var currentTime = new Date();

        var activityID = doc.id; //get unique ID to each hike to be used for fetching right image
        let newAccordion = accordionTemplate.content.cloneNode(true);

        //update title and text and image
        newAccordion.querySelector(".accordion-title").innerHTML = title;
        newAccordion.querySelector(".accordion-type").innerHTML = activityType;
        newAccordion.querySelector(".accordion-building").innerHTML = building;
        newAccordion.querySelector(".accordion-participants").innerHTML =
          CurrentParticipants;
        newAccordion.querySelector(".accordion-description").innerHTML =
          description;

        // newAccordion.querySelector('.card-image').src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

        //give unique ids to all elements for future use
        newAccordion.querySelector("a").onclick = () => joinGroup(activityID);

        //delete the file if the time is up or if there are no participants
        console.log(endTime.toDate() + " : " + currentTime);
        if (endTime.toDate() < currentTime || CurrentParticipants < 1) {
          db.collection(collection).doc(activityID).delete();
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
  var joiningActivityRef = db.collection("activities").doc(id);

  var currentActivityRef = db
    .collection("users")
    .doc(currentUserID)
    .get()
    .then((doc) => {
      var currentActivity = db
        .collection("activities")
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
            joiningActivityRef.update({
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
            db.collection("activities")
              .doc(doc.data().currentGroup)
              .update({
                currentParticipants: snap.data().currentParticipants - 1,
              });

            joiningActivityRef.update({
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
  // console.log("uid of activity is " + id);
  // console.log("uid of previous activity is " + currentUserRef.currentGroup);

  //TODO currently joining a group succesfully increases the participants, leaving a group does not decrease
  // currentActivityRef.update({
  //     currentParticipants: firebase.firestore.FieldValue.increment(-1),
  // })
}

displayCards("activities");
