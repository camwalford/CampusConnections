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
