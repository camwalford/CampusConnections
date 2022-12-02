/**
 * Event Listener For exit button on most pages on site. Takes user back to map.html when clicked.
 */ 
document.getElementById("exitButton").addEventListener("click", backToMap);
function backToMap() {
  window.open("./map.html", "_self");
}