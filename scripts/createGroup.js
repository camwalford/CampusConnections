function ValidationEvent() {
    console.log("this was called");

    var name = document.getElementById("activityType").value;
    var building1 = document.getElementById("building").value;
    // var startTime = document.getElementById("startTime").value;
    // var endTime = document.getElementById("endTime").value;
    var participants1 = document.getElementById("participants").value;
    var description1 = document.getElementById("description").value;

    var activitiesRef = db.collection("activities");
    // activitiesRef.add({
    //     activityType: name,
    //     building: building1,
    //     participants: participants1,
    //     description: description1,
    //     last_updated: firebase.firestore.FieldValue.serverTimestamp()
    // });
        //this is a to test a bug
        activitiesRef.add({
            activityType: "test"
        })

    console.log("this was exocuted");

    for(let i = 0; i < 500; i++) {
        console.log("")
    }

    return true;
}