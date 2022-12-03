var currentUserID;

/**
 * READS id of current user and stores into global variable.
 */
function getCurrentUserID() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      //console.log(user.uid," is logged in");
      currentUserID = user.uid;
      return user.uid;
    } else {
      console.log("no one is logged in");
    }
  });
}
getCurrentUserID();
