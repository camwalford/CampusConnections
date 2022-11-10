
//Invokes a click listener for the message-submit button
document.getElementById("message-submit").addEventListener("click", function(e){
    firebase.auth().onAuthStateChanged(async(user) => {
        
        //Checks if there is a current user logged in
        if(user){
            var uid = user.uid;
            console.log("uid of current user is " + uid);
           
            //Synchronously retrieves current user's group then executes function inside
            db.collection("users").doc(uid).get().then(function(doc) {
                var currentGroupRef = doc.data().currentGroup;
                console.log("currentGroupRef is equal to " + currentGroupRef);
                
                //Checks if currentGroup is undefined or null
                if(currentGroupRef != null || undefined){
                    console.log("the current users group is " + currentGroupRef);

                    //passes in the users current group to the sendMessage function
                    sendMessage(currentGroupRef);
                }else{
                    console.log("the current user is not in a group.");
                }
            });
               
        }else{
            console.log("The current user is not logged in :/");
        }

        function sendMessage(groupRef){
           
            console.log("the sendMessage function was invoked by: " + user.displayName); 

            //Retrieves the message and timestamp
            var messageInput = document.getElementById("message-input");
            var message = messageInput.value;
            var timestamp = Date.now();
            console.log("message value: " + message);
            
            // clears the message input box
            messageInput.value = "";
        
            //auto scroll to bottom
            // document
            // .getElementById("messages")
            // .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
            //if(typeof message === 'string' && message.trim() !== ''){
            //Adds message document to activity's chat collection with data.
                db.collection("activities").doc(groupRef).collection("chats").add({
                    username: user.displayName,
                    message: message,
                    timesent: timestamp
                });
        };


    });
});

// const fetchChat = db.collection("activities").doc(currentGroupRef).collection("chats");

// fetchChat.on("child_added", function (snapshot) {
//   const messages = snapshot.val();
//   const message = `<li class=${
//     displayName === messages.displayName ? "sent" : "receive"
//   }><span>${messages.displayName}: </span>${messages.message}</li>`;
//   // append the message on the page
//   document.getElementById("messages").innerHTML += message;
// });