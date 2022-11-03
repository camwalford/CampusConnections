//import { getDatabase, ref, set } from "firebase/database";

function ValidationEvent() {
    console.log("this was called");

    var title1 = document.getElementById("activityTitle").value
    var type1 = document.getElementById("activityType").value;
    var building1 = document.getElementById("building").value;
    var startTime = document.getElementById("startTime").value;
    var endTime = document.getElementById("endTime").value;
    var participants1 = document.getElementById("participants").value;
    var description1 = document.getElementById("description").value;

    // var activitiesRef = db.collection("activities");
    // activitiesRef.add({
    //     title: title1,
    //     activityType: type1,
    //     building: building1,
    //     participants: participants1,
    //     starttime: startTime,
    //     endtime: endTime,
    //     currentParticipants: 1,
    //     description: description1,
    //     last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    // });


    // for (let i = 0; i < 100000; i++)
    // {
    //     console.log("waiting...")
    // }

    // console.log("this was executed");

    // window.open("group.html", "_self");
    var activitiesRef = db.collection("activities").doc();
   activitiesRef.set({
        title: title1,
        activityType: type1,
        building: building1,
        participants: participants1,
        starttime: startTime,
        endtime: endTime,
        currentParticipants: 1,
        description: description1,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()
      }, (error) => {
        if (error) {
          // The write failed...
        } else {
            console.log("this was executed");
            window.open("group.html", "_self");
        }
      }).then(function() {
        console.log("this was executed");
        window.open("group.html", "_self");
      });
}