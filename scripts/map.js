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