function displayCards(collection) {
    let cardTemplate = document.getElementById("activityTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc


                //delete the file if theres no one in it

                var title = doc.data().title;        // get value of the "name" key
                var activityType = doc.data().activityType;   // get value of the "details" key
                var activityID = doc.id; //gets the unique id for the activity
                var building = doc.data().building;
                var endTime = doc.data().endtime;
                var participants = doc.data().participants;
                var CurrentParticipants = doc.data().currentParticipants;
                var description = doc.data().description;

                var currentTime = new Date();
								
                var activityID = doc.id;    //get unique ID to each hike to be used for fetching right image
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = "type: " + activityType + "<br/>building: " + building + "<br/>participants: " + participants + "<br/>description: " + description;
                // newcard.querySelector('.card-image').src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

                //give unique ids to all elements for future use
                newcard.querySelector('a').onclick = () => joinGroup(activityID);
                
                //delete the file if the time is up or if there are no participants
                console.log(endTime.toDate() + " : " + currentTime);
                if(endTime.toDate() < currentTime || CurrentParticipants < 1) {
                    db.collection(collection).doc(activityID).delete();
                } else {
                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                }
            })
        })
}

function joinGroup(id){
    var currentUserRef = db.collection("users").doc(currentUserID);
    var joiningActivityRef = db.collection("activities").doc(id);
    var currentActivityRef = db.collection("activities").doc(currentUserRef.currentGroup);
    
    console.log("uid of current user is" + currentUserID);
    console.log("uid of activity is " + id);
    console.log("uid of previous activity is " + currentUserRef.currentGroup)

    //TODO currently joining a group succesfully increases the participants, leaving a group does not decrease
    currentActivityRef.update({
        currentParticipants: firebase.firestore.FieldValue.increment(-1),
    })
    joiningActivityRef.update({
        currentParticipants: firebase.firestore.FieldValue.increment(1),
    })
    currentUserRef.update({
        currentGroup: id,
    }).then(() => {
        window.open("group.html", "_self");
    });


}

displayCards("activities");