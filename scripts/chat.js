
document.getElementById("message-submit").addEventListener("click", function(e){
    firebase.auth().onAuthStateChanged(async(user) => {

        
        if(user){
            var uid = user.uid;
            console.log("uid of current user is " + uid);
            //const currentGroupRef = await getGroup(uid);
            db.collection("users").doc(uid).get().then(function(doc) {
                var currentGroupRef = doc.data().currentGroup;
                console.log(doc.data().currentGroup);
                console.log("currentGroupRef is equal to " + currentGroupRef);
                console.log("currentGroupRef is" + currentGroupRef);
                if(currentGroupRef != null || undefined){
                    console.log("the current users group is " + currentGroupRef);
                    sendMessage(currentGroupRef);
                }else{
                    console.log("the current user is not in a group.");
                }
            });
               
        }else{
            console.log("The current user is not logged in :/");
        }

    });

    // async function getGroup(uid){

    //     var groupRef;
    //     db.collection("users").doc(uid).get().then(function(doc) {
    //         groupRef = doc.data['currentGroup'];
    //         console.log("getGroup groupRef is equal to " + groupRef);
    //     });

    // };

        //     const currentGroup = db.collection("users").doc(uid).get("currentGroup").then()

        //     if(currentGroup != null){
        //         console.log("the current users group is " + currentGroup);
        //         sendMessage(currentGroup);
        //     }else{
        //         console.log("the current user is not in a group.");
        //     }
        // }else{
        //     console.log("The current user is not logged in :/");
        //}
    function sendMessage(group){
        console.log("the sendMessage function was run" + user.displayName)
        
    
        var timestamp = Date.now();
        var messageSubmit = document.getElementById("message-submit");
        var message = messageSubmit.value;
        
        // clears the message input box
        messageSubmit.value = "";
    
        //auto scroll to bottom
        // document
        // .getElementById("messages")
        // .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    
        // create db collection and send in the data
        db.collection("activities").doc(group).collection("chats").add({
            username: user.displayName,
            message: message,
            time: timestamp
        });
    };
});



// function sendMessage(group){
//     console.log("the sendMessage function was run" + user.displayName)
    

//     var timestamp = Date.now();
//     var messageSubmit = document.getElementById("message-submit");
//     var message = messageSubmit.value;
    
//     // clears the message input box
//     messageSubmit.value = "";

//     //auto scroll to bottom
//     // document
//     // .getElementById("messages")
//     // .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

//     // create db collection and send in the data
//     db.collection("activities").doc(group).collection("chats").add({
//         username: user.displayName,
//         message: message,
//         time: timestamp
//     });
// };

// const fetchChat = db.collection("activities").doc(currentGroupRef).collection("chats");

// fetchChat.on("child_added", function (snapshot) {
//   const messages = snapshot.val();
//   const message = `<li class=${
//     displayName === messages.displayName ? "sent" : "receive"
//   }><span>${messages.displayName}: </span>${messages.message}</li>`;
//   // append the message on the page
//   document.getElementById("messages").innerHTML += message;
// });