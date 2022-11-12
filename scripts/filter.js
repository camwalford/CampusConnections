function activitySearch() {
    // Declare variables
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById('activity-search-input');
    filter = input.value.toUpperCase();
    ul = document.getElementById("activities-go-here");
    li = ul.getElementsByTagName('li');
  
    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByClassName("accordion-title")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }






 function togglePanel(){
    console.log("button clicked");
    // /* Toggle between hiding and showing the active panel */
    var panel = document.querySelector(".panel");
      if (panel.style.display === "block") {
       panel.style.display = "none";
     } else {
       panel.style.display = "block";
    }
 }
