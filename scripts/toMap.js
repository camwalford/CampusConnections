
document.getElementById('body').addEventListener('click', function backToMap2(){
    window.open("./map.html", "_self" );
});

document.getElementById('main').addEventListener('click', function clickedElement(event){
    event.stopPropagation();
});
