function clearActivities() {
    var activitiesRef = db.collection("activities");
    activitiesRef.forEach(activitiesRef.get().delete());
}