displayCurrentMessages()
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
                //console.log("currentGroupRef is equal to " + currentGroupRef);
                
                //Checks if currentGroup is undefined or null
                if(currentGroupRef != null || undefined){
                    console.log("the current user's group is " + currentGroupRef);

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
        
            
            document
            .getElementById("messages")
            .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

            if(typeof message === 'string' && message.trim() !== ''){
            //Adds message document to activity's chat collection with data.
                db.collection("activities").doc(groupRef).collection("chats").add({
                    username: user.displayName,
                    message: message,
                    timesent: timestamp,
                    uid: currentUserID
                });
                console.log("Message was sent")

            }else{
                alert("🤡🤡🤡 no empty messages 🤡🤡🤡")
            }
        };
   

    });
});



function displayCurrentMessages(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            let messageList = document.getElementById("messages");
            let currentUserID = user.uid;
            console.log("displaymessages " + currentUserID);
            
            //Accessing the firestore chats 
            db
            .collection("users")
            .doc(currentUserID)
            .get()
            .then((doc) => {
                console.log(doc.data().currentGroup);       
                db
                .collection("activities")
                .doc(doc.data().currentGroup)
                .collection("chats")
                .onSnapshot(function(snapshot) {
                    console.log(snapshot);
                    
                    //Each new message in the database is added as a list item.
                    snapshot.docChanges().forEach(function(change) {
                        if (change.type === "added") {
                            let str1 = change.doc.data().uid;
                            let str2 = currentUserID;
                            //checking if the user is sending or receiving the message
                            if(str1 === str2){
                                console.log("New message from: " + change.doc.data().username 
                                    + " " + change.doc.data().message);
                                let li = document.createElement("li")
                                li.innerHTML = ("<span class=\"sender\">" 
                                    + change.doc.data().username + "</span>" 
                                    + "<span class=\"sent-message\">" 
                                    + change.doc.data().message + "</span>");
                                    messageList.appendChild(li);
                            }else{
                                console.log("New message from: " + change.doc.data().username 
                                    + " " + change.doc.data().message);
                                let li = document.createElement("li")
                                li.innerHTML = ("<span class=\"receiver\">" 
                                    + change.doc.data().username + "</span>" 
                                    + "<span class=\"sent-message\">" 
                                    + change.doc.data().message + "</span>");
                                    messageList.appendChild(li);
                            }
                        }
                        if (change.type === "modified") {
                            console.log("Modified message: ", change.doc.data());
                            // TODO implement message editing
                        }
                        if (change.type === "removed") {
                            console.log("Removed message: ", change.doc.data());
                            // TODO implement message removal
                         }
                         document
                         .getElementById("messages")
                         .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
                    });
                });                          
            });
        }
    });
};

                        

                
   

