/**
 * READS profile pic url from firestore and displays it in header.
 */
function displayProfile() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        let picUrl = userDoc.data().profilePic;

        if (picUrl != null) {
          $("#mypic-goes-here").attr("src", picUrl);
        }
      });
    }
  });
}
displayProfile();
