//import { getDatabase, ref, set } from "firebase/database";

function ValidationEvent() {
  //pulls all the information from the html and stores it
  var title1 = document.getElementById("groupTitle").value;
  var type1 = document.getElementById("groupType").value;
  var building1 = document.getElementById("building").value;
  var startTime = document.getElementById("startTime").value;
  var endTime = document.getElementById("endTime").value;
  var participants1 = document.getElementById("participants").value;
  var description1 = document.getElementById("description").value;

  //creates a date based off of the html time starting at the next time that time occurs
  let today = new Date();
  let string = "-";
  if (today.getDate() < 10) {
    string += "0";
  }
  let start = new Date(today.getFullYear() + "-" + (today.getMonth() + 1) + string + (today.getDate()) + "T" + startTime + ":00.000");
  let end = new Date(today.getFullYear() + "-" + (today.getMonth() + 1) + string + (today.getDate()) + "T" + endTime + ":00.000");
  
  if (end < today) {
    end.setDate(end.getDate() + 1);
  }
  if (start < today) {
    start.setDate(end.getDate() + 1);
  }

  //updates the firestore with the modified information so it can be accurately converted to epoch time
  var groupsRef = db.collection("groups");
  var currentUserRef = db.collection("users").doc(currentUserID);
  groupsRef.add({
    title: title1,
    groupType: type1,
    building: building1,
    participants: participants1,
    starttime: start,
    endtime: end,
    currentParticipants: 1,
    description: description1,
    last_updated: firebase.firestore.FieldValue.serverTimestamp()
  }, (error) => {
    if (error) {
      // The write failed...
    } else {
      window.open("group.html", "_self");
    }
  }).then((docRef) => {
    if (inGroup(currentUserRef) == true) { //if the currentGroup is not null
      leaveGroup(currentUserRef) //leave the current group
      .then((idk) => {
        currentUserRef.update({
          currentGroup: docRef.id //join the newly created group
        }).then((kdi) => {
          window.open("group.html", "_self");
        });
      });
    } else {
    currentUserRef.update({
      currentGroup: docRef.id //join the newly created group
    }).then((idk) => {
      window.open("group.html", "_self");
    });
  }
  });
}

async function inGroup(userRef) { //this function doesn't really work
  await userRef.get().then((snap) => {
    return snap.data().currentGroup != null;
  });
}

//leaves the current group
function leaveGroup(currentUserRef) {
  var groupsRef;
  currentUserRef.get().then((snap) => {
    groupsRef = snap.data().currentGroup;
  }).then((idk)=>{
    var GroupRef = db.collection("groups").doc(groupsRef);
  
    GroupRef.update({
      currentParticipants: firebase.firestore.FieldValue.increment(-1),
    });
  })
}

var modal = document.getElementById('create-modal');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Confirms validity of user input and displays confirmation modal if 
document.querySelector("#createButton").addEventListener("click", function (e){
  e.preventDefault();
  // let title1 = document.getElementById("groupTitle");
  // let type1 = document.getElementById("groupType");
  // let building1 = document.getElementById("building");
  // let startTime = document.getElementById("startTime");
  // let endTime = document.getElementById("endTime");
  // //let length = document.getElementById("length");
  // let participants1 = document.getElementById("participants");
  // let description1 = document.getElementById("description");

  // let titleValid = title1.checkValidity();
  // let typeValid = type1.checkValidity();
  // let buildingValid = building1.checkValidity();
  // let startTimeValid = startTime.checkValidity();
  // let endTimeValid = endTime.checkValidity();
  // let participants1Valid = participants1.checkValidity();
  // let description1Valid = description1.checkValidity();

  let isValid = document.querySelector("#create-group-form").reportValidity();

  if(isValid){
    document.getElementById('create-modal').style.display='flex';
  }
});