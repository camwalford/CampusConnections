function displayProfile() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid);
        console.log(user.name);
        console.log(user.email);
        document.getElementById("username").innerHTML = "user: " + user.name;
        document.getElementById("email").innerHTML = "email: " + user.email;
        document.getElementById("users-program").innerHTML = "program: " + user.program;
        document.getElementById("schoolyear").innerHTML = "year: " + user.year;

        //document.getElementsByID("edit").onclick = () => edit(activityID);
      } else {
        console.log("no one is logged in");
      }
    });
  }

  function edit() {
    console.log("edit");
  }
  
  displayProfile();
  