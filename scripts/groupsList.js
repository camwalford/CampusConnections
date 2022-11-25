const params = new URL(window.location.href);

async function displayCards(collection) {
  let accordionTemplate = document.getElementById("groupTemplate");

  await db.collection(collection)
    .get()
    .then((snap) => {
      //If no groups available to display, displays message and link to createGroup.
      if(snap.empty){
        document.getElementById("groups-go-here").innerHTML =
              '<div onclick="backToMap()" id="exitButton" class=" newButton">' +
              
              '</div><div id="noGroup" style="text-align: center;"><p>Sorry, there are no groups to join right now.</p>' +
              '<a id="noGroupLink" href="./createGroup.html">Create a new group here!</a></div>';

      }else{
        snap.forEach((doc) => {
          
          //iterate thru each doc

          var title = doc.data().title; // get value of the "name" key
          var groupType = doc.data().groupType; // get value of the "details" key
          var groupID = doc.id; //gets the unique id for the group
          var building = doc.data().building;
          var startTime = doc.data().starttime;
          var endTime = doc.data().endtime;
          var participants = doc.data().participants;
          var CurrentParticipants = doc.data().currentParticipants;
          var description = doc.data().description;

          var currentTime = new Date();

          var groupID = doc.id; //get unique ID to each hike to be used for fetching right image
          let newAccordion = accordionTemplate.content.cloneNode(true);

          //this code fixes an error where if the time should say 5:02 it would say 5:2
          let startMinutes;
          if (startTime.toDate().getMinutes() < 10) {
            startMinutes = "0" + startTime.toDate().getMinutes();
          } else {
            startMinutes = startTime.toDate().getMinutes();
          }
          let endMinutes;
          if (endTime.toDate().getMinutes() < 10) {
            endMinutes = "0" + endTime.toDate().getMinutes();
          } else {
            endMinutes = endTime.toDate().getMinutes();
          }



          //converts the date to a 12 hour clock
          if (startTime.toDate().getHours() > 12) {
            startTime = startTime.toDate().getHours() - 12 + ":" + startMinutes + "pm";
          } else {
            startTime = startTime.toDate().getHours() + ":" + startMinutes + "am";
          }

          if (endTime.toDate().getHours() > 12) {
            end = endTime.toDate().getHours() - 12 + ":" + endMinutes + "pm";
          } else {
            end = endTime.toDate().getHours() + ":" + endMinutes + "am";
          }

          //update title and text and image
          newAccordion.querySelector(".accordion-title").innerHTML = title;
          newAccordion.querySelector(".accordion-type").innerHTML = groupType;
          newAccordion.querySelector(".accordion-time").innerHTML = startTime + " - " + end;
          newAccordion.querySelector(".accordion-building").innerHTML = building;
          newAccordion.querySelector(".accordion-participants").innerHTML =
            CurrentParticipants + "/" + participants;
          newAccordion.querySelector(".accordion-description").innerHTML =
            description;

          newAccordion.querySelector("a").onclick = () => joinGroup(groupID);


          //delete the file if the time is up or if there are no participants
          console.log(endTime.toDate() + " : " + currentTime);
          if (endTime.toDate() < currentTime || CurrentParticipants < 1) {
            db.collection(collection).doc(groupID).delete();
          } else {
            //attach to gallery
            document
              .getElementById(collection + "-go-here")
              .appendChild(newAccordion);
          }
        });
      }
    });
  checkParams();
  accordion(); 
}

displayCards("groups");

function joinGroup(id) {
  var currentUserRef = db.collection("users").doc(currentUserID);
  var joiningGroupRef = db.collection("groups").doc(id);

  var currentGroupRef = db
    .collection("users")
    .doc(currentUserID)
    .get()
    .then((doc) => {
      var currentGroup = db
        .collection("groups")
        .doc(doc.data().currentGroup)
        .get()
        .then((snap) => {
          //implement something to check if you try to join the group you're already in, it currently breaks it
          console.log("snap.data() " + snap.id);
          console.log("joiningActivitiyRef " + id);
          if (snap.id == id) {
            alert("no joining the group you're already in");
          } else if (snap.id = "undefined") {
            console.log("snap.id is undefined");
            joiningGroupRef.update({
              currentParticipants: firebase.firestore.FieldValue.increment(1),
            });
            currentUserRef
              .update({
                currentGroup: id,
              })
              .then(() => {
                window.open("group.html", "_self");
              });
          } else {
            //snap.data().currentParticipants = 1;
            db.collection("groups")
              .doc(doc.data().currentGroup)
              .update({
                currentParticipants: snap.data().currentParticipants - 1,
              });

            joiningGroupRef.update({
              currentParticipants: firebase.firestore.FieldValue.increment(1),
            });
            currentUserRef
              .update({
                currentGroup: id,
              })
              .then(() => {
                window.open("group.html", "_self");
              });
          }
        });
    });

  // console.log("uid of current user is" + currentUserID);
  // console.log("uid of group is " + id);
  // console.log("uid of previous group is " + currentUserRef.currentGroup);

  //TODO currently joining a group succesfully increases the participants, leaving a group does not decrease
  // currentGroupRef.update({
  //     currentParticipants: firebase.firestore.FieldValue.increment(-1),
  // })
}

//Displays extra group information in accordion dropdown on click.
function accordion() {
  //console.log("activities loaded");
  let acc = document.getElementsByClassName("accordion");

  //Loops over all activities and adds an on-click listener for the dropdown.
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }
}

// Auto-filter groups based on parameters currently in searchbar.
function groupSearch() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('group-search-input');
  filter = input.value.toUpperCase();
  ul = document.getElementById("groups-go-here");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByClassName("search-queries")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// Sets search to parameter in searchbar if present
function checkParams(){
  let buildingParam = params.searchParams.get("buildingId");
  if (buildingParam !== null) {
    input = document.getElementById('group-search-input');
    input.value = buildingParam;
    groupSearch();
  }
}