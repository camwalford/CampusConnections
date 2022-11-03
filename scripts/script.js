var currentUserID;
function getCurrentUserID() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid," is logged in");
            currentUserID = user.uid;
        }
        else {
            console.log("no one is logged in");
        }
    })
}
getCurrentUserID();