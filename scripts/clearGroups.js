//this file has optional code for testing, not a part of any release

/**
 * Deletes all activities in the groups collection
 */
function clearGroups() {
  var activitiesRef = db.collection("groups");
  activitiesRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      activitiesRef.doc(doc.id).delete();
    });
  });
}

function checkGroups() {
  var today = new Date();
  var currentTime = today.getHours() + ":" + today.getMinutes();
  var activitiesRef = db.collection("groups");
  activitiesRef.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      if (activitiesRef.doc(doc.id).get("endtime") < currentTime) {
        activitiesRef.doc(doc.id).delete();
      }
    });
  });
}

checkGroups();
