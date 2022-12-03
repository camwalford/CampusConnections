//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadSkeleton() {
  console.log($("#header").load("./text/header.html"));
  console.log($("#navBar").load("./text/nav.html"));
}
loadSkeleton(); //invoke the function
