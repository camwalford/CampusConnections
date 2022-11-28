//Listener for clicking the background map to return to map.html from any other page.
document.getElementById('main').addEventListener('click', function backToMap2() {
    window.open("./map.html", "_self");
});

//Stops click from propagating to main if any descendant element of main is clicked.
document.querySelector('main *').addEventListener('click', function clickedElement(event) {
    event.stopPropagation();
});