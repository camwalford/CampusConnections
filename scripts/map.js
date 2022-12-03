let areas = document.querySelectorAll("area");
let buildings = document.querySelectorAll(".buildings");
let map = document.getElementById("map");
let wrapper = document.getElementById("wrapper");

/**
 * Adds mouseover and mouseout listener for each map area. Changes z-index of
 * building image for building you hover over to be at the top. Changes
 * wrapper to be in between main map and currently hovered building.
 */
function mouseAreas() {
  for (let i = 0; i < areas.length; i++) {
    let id = areas[i].id;
    areas[i].addEventListener("mouseover", function () {
      let buildingID = id + 1;
      buildingMap = document.getElementById(buildingID);
      buildingMap.classList.add("zhigh");
      wrapper.classList.add("zmiddle");
    });
    areas[i].addEventListener("mouseout", function () {
      let buildingID = id + 1;
      buildingMap = document.getElementById(buildingID);
      buildingMap.classList.remove("zhigh");
      wrapper.classList.remove("zmiddle");
    });
  }
}
mouseAreas();

/*---Functions for tutorial slideshow (Much of slideshow function taken from W3schools.)---*/

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// dot image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

/**
 * Displays slides in tutorial slideshow, based on index.
 * @param {The index of the slide to be shown} n
 */
function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slide");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
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

/* Disables tutorial after closing it for each user */
function tutorialOff() {
  db.collection("users").doc(currentUserID).update({ tutorialOn: false });
  console.log("tutorial should now be off");
}

let tutorialModal = document.getElementById("tutorial-modal");
let tutorialClose = document.getElementById("tut-close");

//Listener for disabling the tutorial once the close button is clicked.
tutorialClose.addEventListener("click", tutorialOff);

//If user is logging on for the first time, display tutorial
function tutorial(id) {
  db.collection("users")
    .doc(id)
    .get()
    .then((snap) => {
      if (snap.data().tutorialOn) {
        tutorialModal.style.display = "flex";
      }
    });
}

//Passes the users ID into the tutorial function to check if tutorial is enabled
function getUserID(callback) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      currentUserID = user.uid;
      callback(currentUserID);
    }
  });
}

getUserID(callback);

// Function to re-enable tutorial
function tutorialOn() {
  db.collection("users").doc(currentUserID).update({ tutorialOn: true });
}
