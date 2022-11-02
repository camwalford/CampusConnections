function ValidationEvent() {
    console.log("this was called");

    var title1 = document.getElementById("activityTitle").value
    var name = document.getElementById("activityType").value;
    var building1 = document.getElementById("building").value;
    // var startTime = document.getElementById("startTime").value;
    // var endTime = document.getElementById("endTime").value;
    var participants1 = document.getElementById("participants").value;
    var description1 = document.getElementById("description").value;

    var activitiesRef = db.collection("activities");
    activitiesRef.add({
        title: title1,
        activityType: name,
        building: building1,
        participants: participants1,
        currentParticipants: 1,
        description: description1,
        last_updated: firebase.firestore.FieldValue.serverTimestamp(),
    });



    console.log("this was executed");

    window.open("group.html", "_self");


    // return true;
}