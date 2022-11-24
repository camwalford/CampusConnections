document.getElementById('main').addEventListener('click', function backToMap2() {
    window.open("./map.html", "_self");
});

document.querySelector('main *').addEventListener('click', function clickedElement(event) {
    event.stopPropagation();
});