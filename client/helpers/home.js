if (Meteor.isClient) {
 /*
  * Returns the title and greeting.
  */
  Template.home.greeting = function() {
    //console.log("Title was querried");
    return "Welcome to DMware"
  }

  /*
  * Returns text about site.
  */
  Template.home.purpose = function() {
    //console.log("Purpose was querried");
    return "Online RPG toolkit";
  }

  Template.home.mission = function() { 
    console.log("Content was querried"); 
    return "We are here to serve the needs of table-top and RPG gamers of all kinds by providing an" +
    " online toolkit that allows users to login, create a session, and keep track of all the things" +
    " needed for your game, all while being able to connect with your group in real-time. DMware" +
    " aims to achieve the following features in ways that are intuitive for our guests:"
  }

  Template.home.launch = function() { 
    console.log("Content was querried"); 
    return "Stay tuned, we hope to be fully operational by 2016";
  }
}
