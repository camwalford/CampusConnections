// function displayCards(collection) {
//     let cardTemplate = document.getElementById("activityTemplate");

//             console.log("uid of current user is " + currentUserID);
//             if(currentUserID) {

//             var currentUserRef = db.collection("users").doc(currentUserID)
//             .then(() => {
//                 var currentGroup = currentUserRef.get("currentGroup")
//             })
//             .then(() => {
//                 console.log(currentGroup);
//                 //needs activity with the same name as user current group
//                 activt = db.collection("activities").get(currentGroup);
//                     var title = activt.title;        // get value of the "name" key
//                     var activityType = activt.activityType;   // get value of the "details" key
//                     var building = activt.building;
//                     var participants = activt.participants;
//                     var description = activt.description;

//                     var hikeID = activt.code;    //get unique ID to each hike to be used for fetching right image
//                     let newcard = cardTemplate.content.cloneNode(true);

//                     //update title and text and image
//                     newcard.querySelector('.card-title').innerHTML = title;
//                     newcard.querySelector('.card-text').innerHTML = "type: " + activityType + "<br/>building: " + building + "<br/>participants: " + participants + "<br/>description: " + description;
//                     // newcard.querySelector('.card-image').src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

//                     //give unique ids to all elements for future use
//                     // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
//                     // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
//                     // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

//                     //attach to gallery
//                     document.getElementById(collection + "-go-here").appendChild(newcard);
//             })
//         }

// }

function displayCards(collection) {
  let cardTemplate = document.getElementById("activityTemplate");
  //   console.log("test " + (currentUserID));

  var currentGroupRef = db
    .collection("users")
    .doc(currentUserID)
    .get("currentGroup")
    .then((snip) => {
      db.collection(collection)
        .get()
        .then((snap) => {
          snap.forEach((doc) => {
            //iterate thru each doc
            console.log(doc.id + " " + snip);

            if (currentGroupRef == doc.id) {
              console.log(doc.id + "" + currentUserRef.currentGroup);
              var title = doc.data().title; // get value of the "name" key
              var activityType = doc.data().activityType; // get value of the "details" key
              var activityID = doc.id; //gets the unique id for the activity
              var building = doc.data().building;
              var participants = doc.data().participants;
              var description = doc.data().description;

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
              // newcard.querySelector('.card-image').src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

              //give unique ids to all elements for future use
              newcard.querySelector("a").onclick = () => joinGroup(activityID);

              //attach to gallery
              document
                .getElementById(collection + "-go-here")
                .appendChild(newcard);
            }
          });
        });
    });
}

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
              var building = snap.data().building;
              var participants = snap.data().participants;
              var description = snap.data().description;

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

//displayCards("activities");
displayGroup();
