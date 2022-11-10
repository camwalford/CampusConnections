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

displayGroup();
