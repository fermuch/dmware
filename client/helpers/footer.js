/*
* Filename: footer.js
* Author: Joshua Michael Waggoner
* GitHub: github.com/rabbitfighter81/DMware
* Purpose: Client side Javascript interactions with footer template go here
*/

/*********************** Client Side ************************/

 /*
 * Client side functions
 */
if (Meteor.isClient) {
  /*
  * Returns the copyright.
  */
  Template.footer.copyright = function() {
    // From 'moment' package. See 'smart.json'
    var y = moment().format('YYYY');
    var copyright = "Copyright \u00A9 " + y + " rabbitfighter.net";
    console.log("Copyright string was querried");
    return copyright;
  }

  /*
  * Returns the date using "moment" package. See smart.json for all packages.
  */
  Template.footer.date = function() {
    console.log("Date function was querried");
    return "Today is " + moment().format('MMM Do YYYY') + "...";
  }

}