/**Functions related to the chat on the group.html page */

displayCurrentMessages();
var currentPfpRef;

/**
 * Adds event listener to the chat submit button, validates whether user is signed in, and sends the message.
 */
document
  .getElementById("message-submit")
  .addEventListener("click", function (e) {
    firebase.auth().onAuthStateChanged(async (user) => {
      //Checks if the submitter is currently logged in
      if (user) {
        var uid = user.uid;
        //Synchronously retrieves user's current group and then executes the sendMessage function if they are in one.
        db.collection("users")
          .doc(uid)
          .get()
          .then(function (doc) {
            var currentGroupRef = doc.data().currentGroup;
            currentPfpRef = doc.data().profilePic;

            if (currentGroupRef != null || undefined) {
              //passes in the users current group to the sendMessage function
              sendMessage(currentGroupRef);
            } else {
              console.log("the current user is not in a group.");
            }
          });
      } else {
        console.log("The current user is not logged in :/");
      }

      /**
       * Writes user's input into the firestore database as a new document.
       * @param {Reference to user's current group} groupRef
       */
      function sendMessage(groupRef) {
        //Retrieves the message and timestamp
        var messageInput = document.getElementById("message-input");
        var message = messageInput.value;
        var timestamp = Date.now();
        // clears the message input box
        messageInput.value = "";
        // scrolls message into view
        document.getElementById("messages").scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
        //Checks that the user isn't sending a blank message
        if (typeof message === "string" && message.trim() !== "") {
          //Adds message document to group's chat collection with data.
          db.collection("groups").doc(groupRef).collection("chats").add({
            username: user.displayName,
            userpfp: currentPfpRef,
            message: message,
            timesent: timestamp,
            uid: currentUserID,
          });
          //Makes chatbox red when user tries to send an empty message.
        } else {
          messageInput.setCustomValidity("You can't send an empty message 🙃");
          messageInput.reportValidity();
          messageInput.classList.add("empty-chat");
          setTimeout(() => messageInput.classList.remove("empty-chat"), 6000);
        }
      }
    });
  });

/**
 * Reads and displays the messages currently stored in
 * that group's chat subcollection in firestore.
 */
function displayCurrentMessages() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      let messageList = document.getElementById("messages");
      let currentUserID = user.uid;
      //Accessing the user's group
      db.collection("users")
        .doc(currentUserID)
        .get()
        .then((doc) => {
          //Accessing the group's chats
          db.collection("groups")
            .doc(doc.data().currentGroup)
            .collection("chats")
            .onSnapshot(function (snapshot) {
              //Monitors the database, adding each new message in the database as a list item.
              snapshot.docChanges().forEach(function (change) {
                if (change.type === "added") {
                  let str1 = change.doc.data().uid;
                  let str2 = currentUserID;
                  //checking if the user is sending or receiving the message
                  if (str1 === str2) {
                    let li = document.createElement("li");
                    li.innerHTML =
                      '<span class="sender">' +
                      '<img id="mypic-goes-here" src="' +
                      change.doc.data().userpfp +
                      '" width="20px" height="20px" />' +
                      change.doc.data().username +
                      "</span>" +
                      '<span class="sent-message">' +
                      change.doc.data().message +
                      "</span>";
                    messageList.appendChild(li);
                  } else {
                    let li = document.createElement("li");
                    li.innerHTML =
                      '<span class="receiver">' +
                      '<img id="mypic-goes-here" src="' +
                      change.doc.data().userpfp +
                      '" width="20px" height="20px" />' +
                      change.doc.data().username +
                      "</span>" +
                      '<span class="sent-message">' +
                      change.doc.data().message +
                      "</span>";
                    messageList.appendChild(li);
                  }
                }
                //Scroll new messages into view
                document.getElementById("messages").scrollIntoView({
                  behavior: "smooth",
                  block: "end",
                  inline: "nearest",
                });
              });
            });
        });
    }
  });
}

/**
 * Sends chat when the user presses enter. Prevents the default enter function.
 */
document
  .getElementById("message-input")
  .addEventListener("keypress", function (event) {
    this.classList.remove("empty-chat");
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("message-submit").click();
    }
  });
