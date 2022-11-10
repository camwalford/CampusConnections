// document.getElementById("message-submit").addEventListener("click", function(e){
//     firebase.auth().onAuthStateChanged(async(user) => {
//         var uid = user.uid;
//         console.log("uid of current user is " + uid);

//         db.collection("users").doc(uid).get().then(function(doc) {
//             var currentGroupRef = doc.data().currentGroup;
//             console.log(doc.data().currentGroup);
//             console.log("currentGroupRef is equal to " + currentGroupRef);
//         });
//     });
// });

firebase.auth().onAuthStateChanged(async(user) => {
    //Checks if there is a current user logged in
    
    var uid = user.uid;
    console.log("uid of current user is " + uid);
    db.collection("users").doc(uid).get().then(async function(doc) {
        var currentGroupRef = doc.data().currentGroup;
        console.log("currentGroupRef is equal to " + currentGroupRef);
        const chatroom = await db.collection("activities").doc(currentGroupRef).collection("chats").get().then(async function() {
            chatroom.doc.map()

        });
        getChat.
        getChat.on("child_added", function (snapshot) {
            const messages = snapshot.val();
            const message = `<li class=${
            displayName === messages.displayName ? "sent" : "receive"
            }><span>${messages.displayName}: </span>${messages.message}</li>`;
  // append the message on the page
    document.getElementById("messages").innerHTML += message;
});
});
});