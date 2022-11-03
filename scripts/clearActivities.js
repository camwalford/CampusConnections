function clearActivities() {
    var activitiesRef = db.collection("activities");
    activitiesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(doc.id);
            activitiesRef.doc(doc.id).delete();
        })
    })
}


function clearActivities() {
    var activitiesRef = db.collection("activities");
    activitiesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            //console.log(doc.id);
            activitiesRef.doc(doc.id).delete();
        })
    })
}