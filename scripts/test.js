document.getElementById("message-submit").addEventListener("click", function(e){
    firebase.auth().onAuthStateChanged(async(user) => {
        var uid = user.uid;
        console.log("uid of current user is " + uid);

        db.collection("users").doc(uid).get().then(function(doc) {
            var currentGroupRef = doc.data().currentGroup;
            console.log(doc.data().currentGroup);
            console.log("currentGroupRef is equal to " + currentGroupRef);
        });
    });
});