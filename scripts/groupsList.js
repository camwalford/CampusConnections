const params = new URL(window.location.href); //retrieve parameters passed in URL

/**
 * READS all current groups from firestore and displays each in a template retrieved from the groupList.html page.
 * If there are no current groups, it displays a redirect message/link for user to create a group of their own.
 * @param {The "groups" collection} collection
 */
async function displayGroups(collection) {
  let accordionTemplate = document.getElementById("groupTemplate");

  await db
    .collection(collection)
    .get()
    .then((snap) => {
      //If no groups available to display, displays message and link to createGroup.
      if (snap.empty) {
        document.getElementById("groups-go-here").innerHTML =
          '<div onclick="backToMap()" id="exitButton" class=" newButton">' +
          '</div><div id="noGroup" style="text-align: center;"><p>Sorry, there are no groups to join right now.</p>' +
          '<a id="noGroupLink" href="./createGroup.html">Create a new group here!</a></div>';
      } else {
        snap.forEach((doc) => {
          var title = doc.data().title; // get value of the "name" key
          var groupType = doc.data().groupType; // get value of the "details" key
          var groupID = doc.id; //gets the unique id for the group
          var building = doc.data().building;
          var startTime = doc.data().starttime;
          var endTime = doc.data().endtime;
          var maxParticipants = doc.data().participants;
          var CurrentParticipants = doc.data().currentParticipants;
          var description = doc.data().description;
          var currentTime = new Date();
          var groupID = doc.id; //get unique ID for each group to be used for fetching right image
          let newAccordion = accordionTemplate.content.cloneNode(true);

          if(startTime.substring(0, 2) > 12) {
            startTime = startTime.substring(0, 2) - 12 + startTime.substring(2, 5) + " PM";
          } else {
            startTime = startTime.substring(0, 5) + " AM";
          }
          if(endTime.substring(0, 2) > 12) {
            endTime = endTime.substring(0, 2) - 12 + endTime.substring(2, 5) + " PM";
          } else {
            endTime = endTime.substring(0, 5) + " AM";
          }

          // //converts time to 12 hour clock
          // startTime = startTime.toDate().toLocaleTimeString("en-US", {
          //   timeZone: "PST",
          //   hour12: true,
          //   hour: "numeric",
          //   minute: "numeric",
          // });
          // end = endTime.toDate().toLocaleTimeString("en-US", {
          //   timeZone: "PST",
          //   hour12: true,
          //   hour: "numeric",
          //   minute: "numeric",
          // });

          //Updates title,, group type, time, building, participants, and description.
          newAccordion.querySelector(".accordion-title").innerHTML = title;
          newAccordion.querySelector(".accordion-type").innerHTML = groupType;
          newAccordion.querySelector(".accordion-time").innerHTML =
            '<span id="clock" class="material-symbols-outlined">schedule</span>' +
            startTime +
            " - " +
            endTime;
          newAccordion.querySelector(".accordion-building").innerHTML =
            '<span id="pin" class="material-symbols-outlined">location_on</span>' +
            building;
          newAccordion.querySelector(".accordion-participants").innerHTML =
            '<span id="person" class="material-icons">person</span>' +
            CurrentParticipants +
            "/" +
            maxParticipants;
          newAccordion.querySelector(".accordion-description").innerHTML =
            "Description: " + description;
          if (maxParticipants <= CurrentParticipants) {
            newAccordion.querySelector("#join-now").innerHTML = "";
          } else {
            newAccordion.querySelector("a").onclick = () => joinGroup(groupID);
          }

          //delete the file if the time is up or if there are no participants
          if (endTime < currentTime || CurrentParticipants < 1) {
            db.collection(collection).doc(groupID).delete();
          } else {
            //appends group to the groups-go-here element in groupList.html
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

displayGroups("groups");

/**
 * Returns whether a group is full or not.
 * @param {The group ID} joinid
 * @return {true if group is full, false if not full}
 */
async function groupIsFull(joinid) {
  await joinid.get().then((snip) => {
    console.log(
      "returning: " +
        snip.data().currentParticipants +
        ">=" +
        parseInt(snip.data().participants)
    );
    return (
      parseInt(snip.data().currentParticipants) >=
      parseInt(snip.data().participants)
    );
  });
}

/**
 * UPDATES users currentGroup field in firestore to the group id passed in.
 * Also updates currentParticipant number in the group document.
 * Also decreases the members of the group they just left.
 * @param {the group id} id
 */
function joinGroup(id) {
  var currentUserRef = db.collection("users").doc(currentUserID);
  var joiningGroupRef = db.collection("groups").doc(id);

  db.collection("users")
    .doc(currentUserID)
    .get()
    .then((doc) => {
      if (doc.data().currentGroup != null) {
        db.collection("groups")
          .doc(doc.data().currentGroup)
          .get()
          .then((snap) => {
            if (snap.id == id) {
              alert("no joining the group you're already in");
            } else if (snap.id == "undefined") {
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
                  currentParticipants:
                    firebase.firestore.FieldValue.increment(-1),
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
      } else {
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
}

/**
 * Displays group description, start/end times, and join button when a group in the list is clicked.
 */
function accordion() {
  let acc = document.getElementsByClassName("accordion");

  //Loops over all activities and adds an on-click listener for the dropdown.
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      let panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
        panel.style.borderTop = "none";
        panel.style.borderBottom = "none";
      } else {
        panel.style.maxHeight = 180 + "px";
        panel.style.borderTop = "1px solid #ccc";
        panel.style.borderBottom = "1px solid #ccc";
      }
    });
  }
}

/**
 * Auto-filters groups based on parameters currently in searchbar.
 */
function groupSearch() {
  let input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("group-search-input");
  filter = input.value.toUpperCase();
  ul = document.getElementById("groups-go-here");
  li = ul.getElementsByTagName("li");

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

/**
 * Sets search to whichever buildingId parameter has been passed through the URL.
 */
function checkParams() {
  let buildingParam = params.searchParams.get("buildingId");
  if (buildingParam !== null) {
    input = document.getElementById("group-search-input");
    input.value = buildingParam;
    groupSearch();
  }
}
