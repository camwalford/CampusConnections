function clearActivities() {
    var activitiesRef = db.collection("activities");
    activitiesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(doc.id);
            activitiesRef.doc(doc.id).delete();
        })
    })
}


function checkActivities() {
var today = new Date();
var currentTime = today.getHours() + ":" + today.getMinutes();

    var activitiesRef = db.collection("activities");
    activitiesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(doc.id);
            console.log(activitiesRef.doc(doc.id).get("endtime") + "     " + currentTime);
            if (activitiesRef.doc(doc.id).get("endtime") < currentTime) {
                activitiesRef.doc(doc.id).delete();
            }
        })
    })
}

checkActivities();