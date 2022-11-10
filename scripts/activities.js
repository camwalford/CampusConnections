function displayCards(collection) {
    let cardTemplate = document.getElementById("activityTemplate");

    db.collection(collection).get()
        .then(snap => {
            //var i = 1;  //if you want to use commented out section
            snap.forEach(doc => { //iterate thru each doc
                var title = doc.data().title;        // get value of the "name" key
                var activityType = doc.data().activityType;   // get value of the "details" key
                var activityID = doc.id; //gets the unique id for the activity
                var building = doc.data().building;
                var participants = doc.data().participants;
                var description = doc.data().description;

								
                //var hikeID = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = "type: " + activityType + "<br/>building: " + building + "<br/>participants: " + participants + "<br/>description: " + description;
                // newcard.querySelector('.card-image').src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

                //give unique ids to all elements for future use
                newcard.querySelector('a').onclick = () => joinGroup(activityID);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}

function joinGroup(id){
    console.log("uid of current user is" + currentUserID);
    console.log("uid of activity is " + id);
    var currentUserRef = db.collection("users").doc(currentUserID);
    currentUserRef.update({
        currentGroup: id,
    }).then(() => {
        window.open("group.html", "_self");
    });


}

displayCards("activities");