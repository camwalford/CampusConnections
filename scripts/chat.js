document.getElementById("message-submit").addEventListener("submit", sendMessage)

var currentGroupRef = db.collection("users").doc(currentUserID).get("currentGroup");

function sendMessage(){
    console.log(user.displayName);
    if(currentUserID !== null){
        console.log("the function was run" + user.displayName)
        e.preventDefault();

        const timestamp = Date.now();
        const messageSubmit = document.getElementById("message-submit");
        const message = messageSubmit.value;

    // clear the input box
        messageSubmit.value = "";

    //auto scroll to bottom
        // document
        // .getElementById("messages")
        // .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
        db.collection("activities").doc(currentGroupRef).collection("chats").add({
            username: user.displayName,
            message: message,
            time: timestamp
        })
    }else{
        console.log("You are not signed in, how are you even in this group???");
    }
  };

// const fetchChat = db.collection("activities").doc(currentGroupRef).collection("chats");

// fetchChat.on("child_added", function (snapshot) {
//   const messages = snapshot.val();
//   const message = `<li class=${
//     displayName === messages.displayName ? "sent" : "receive"
//   }><span>${messages.displayName}: </span>${messages.message}</li>`;
//   // append the message on the page
//   document.getElementById("messages").innerHTML += message;
// });