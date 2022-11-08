function displayCards(collection) {
    let cardTemplate = document.getElementById("activityTemplate");

    var currentUserRef = db.collection("users").doc(currentUserID);
    var currentGroup = currentUserRef.get("currentGroup");
    console.log(currentGroup);
//needs activity with the same name as user current group
    activt = db.collection("activities").get(currentGroup);
                var title = activt.data().title;        // get value of the "name" key
                var activityType = activt.data().activityType;   // get value of the "details" key
                var building = activt.data().building;
                var participants = activt.data().participants;
                var description = activt.data().description;

								
                var hikeID = activt.data().code;    //get unique ID to each hike to be used for fetching right image
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = "type: " + activityType + "<br/>building: " + building + "<br/>participants: " + participants + "<br/>description: " + description;
                // newcard.querySelector('.card-image').src = `./images/${hikeID}.jpg`; //Example: NV01.jpg

                //give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery
                document.getElementById(collection + "-go-here").appendChild(newcard);
                //i++;   //if you want to use commented out section
}

displayCards("activities");