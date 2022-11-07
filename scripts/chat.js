import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;
const displayName = user.displayName;
const userId = user.uid;

var currentActivityRef = db.collection("users").document(userId).get("currentGroup");

function sendMessage(submitPressed){
    if(user !== null){
        submitPressed.preventDefault();
        const timestamp = Date.now();
        const messageSubmit = document.getElementById("message-submit");
        const message = messageSubmit.value;

    // clear the input box
        messageSubmit.value = "";

    //auto scroll to bottom
        document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
        db.collection("activities").doc(currentActivityRef).collection("chats").add({
            username: displayName,
            message: message,
            time: timestamp
        })
    }else{
        console.log("You are not signed in, how are you even in this group???");
    }
  };


const fetchChat = db.collection("activities").doc(currentActivityRef).collection("chats");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    displayName === messages.displayName ? "sent" : "receive"
  }><span>${messages.displayName}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});