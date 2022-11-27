let areas = document.querySelectorAll("area");
let buildings = document.querySelectorAll(".buildings");
let map = document.getElementById("map");
let wrapper = document.getElementById("wrapper");

//Function for highlighting areas of map on hover
function mouseAreas(){
    for(let i = 0; i < areas.length; i++){
        let id = areas[i].id;
        areas[i].addEventListener("mouseover", function(){
            let buildingID = id + 1;
            buildingMap = document.getElementById(buildingID);
            buildingMap.classList.add("zhigh");
            wrapper.classList.add("zmiddle");
        });
        areas[i].addEventListener("mouseout", function(){
            let buildingID = id + 1;
            buildingMap = document.getElementById(buildingID);
            buildingMap.classList.remove("zhigh");
            wrapper.classList.remove("zmiddle");
        });

    }
}

mouseAreas();


/* Function for tutorial slideshow */

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


//Defining variables for various tutorial functions
let modal = document.getElementById("tutorial-modal");
let callback = tutorial;
let currentUserID;

// When the user clicks anywhere outside of the modal, close it and disable tutorial
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    tutorialOff();
  }
};

/** disables tutorial after closing it for each user */
function tutorialOff(){
    db.collection("users").doc(currentUserID).update(
        {tutorialOn: false}
    ); 
    console.log("tutorial should now be off");
}

let tutorialModal = document.getElementById('tutorial-modal');
let tutorialClose = document.getElementById('tut-close');

//Checks if the close button is clicked, disables tutorial
tutorialClose.addEventListener("click", tutorialOff);

//If user is logging on for the first time, display tutorial
function tutorial(id){
   db.collection("users").doc(id).get().then((snap) => {
        console.log(snap.data());
        if(snap.data().tutorialOn){
            tutorialModal.style.display = "flex";
        }
   }
   )
}

//Passes the users ID into the tutorial function to check if tutorial is enabled
function getUserID(callback){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log(user.uid, " is logged in");
            currentUserID = user.uid;
            callback(currentUserID);
        }
    });
}

getUserID(callback);

// testing function to allow re-enabling of tutorial
function tutorialOn(){
    db.collection("users").doc(currentUserID).update(
        {tutorialOn: true}
    ); 
    console.log("tutorial should now be on");
}