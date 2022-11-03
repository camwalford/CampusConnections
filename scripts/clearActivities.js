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
var currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var activitiesRef = db.collection("activities");
    activitiesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(doc.id);
            if (activitiesRef.doc(doc.id).get(endTime) < currentTime) {
                activitiesRef.doc(doc.id).delete();
            }
        })
    })
}

checkActivities();