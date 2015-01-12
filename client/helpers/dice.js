/*
* Filename: dmware.js
* Author: Joshua Michael Waggoner
* GitHub: github.com/rabbitfighter81/DMware
* Purpose: Client side Javascript interactions with dice.html go here
*/

/*********************** Client Side ************************/



 /*
 * Client side functions
 */
if (Meteor.isClient) {

  Meteor.subscribe('rolls');

  Meteor.subscribe('duplicates');

  Session.setDefault("total", 0);
  
  Session.set("rollSequence", 0);

  Session.set("numDice", "N/A");

  Session.set("numSides", "N/A");

  Session.set("average", "N/A");

  /*
  * Dice template helpers
  */
  Template.dice.helpers({
    total: function () {
      return Session.get("total");
    },

    rollSequence: function() {
      return Session.get("rollSequence");
    },

    numDice: function() {
      return Session.get("numDice");
    },

    numSides: function() {
      return Session.get("numSides");
    },

    average: function() {
      return Session.get("average");
    },

    duplicates: function() {
      return Session.get("duplicates");
    }
    /*
    duplicates: function() {
      return Session.get("duplicates");
    }
    */

  });

  /*
  * Sets the number of sides.
  */
  var setNumSides = function() {
    
    // Get the list by ID
    var list = document.getElementById('select_numSides');
    
    // Get the index of lists
    var INDEX = list.selectedIndex;
    
    // Get the number of sides to roll with
    var numSides = list[INDEX].value;

    // If the number is custom, ask for input
    if (numSides == "custom") {
        var numSides = prompt("Please enter number of SIDES for the dice:", numSides);
        if (numSides == null) {
            numSides = setNumSides();
        } else if (numSides > 999) {
            alert("Very funny... Try a smaller number than 1000");
            numSides = setNumSides();
        }
    }; 

    console.log("Number of sides was set to " + numSides);
    
    return numSides;
  }

  /*
  *Sets the number of dice
  */
  var setNumDice = function() {
    
    // Get the list by ID
    var list = document.getElementById('select_numDice');
    
    // Get the index of lists
    var INDEX = list.selectedIndex;
    
    // Get the number of sides to roll with
    var numDice = list[INDEX].value;

    // If the number is custom, ask for input
    if (numDice == "custom") {
        var numDice = prompt("Please enter number of DICE to roll:", numDice);
        if (numDice == null) {
            numDice = setNumDice();
        } else if (numDice > 999) {
            alert("Very funny... Try a smaller number smaller than 1000.");
            numDice = setNumDice();
        }
    };  

    console.log("Number of dice was set to " + numDice);
    
    return numDice;
  }

  /*
  * Resets the dice and the
  */
  var resetDiceArea = function() {
    
    // Vaiable to hold and manipulate the information in "<p id="rollStatus>"
    var rollInfo = document.getElementById("rollInfo");
   
    /*
    * Removes all items from the DiceRolls Mongo collection
    */
    Rolls.find().forEach(function(doc) {
        Rolls.remove(doc._id)
    })

    Duplicates.find().forEach(function(doc) {
        Duplicates.remove(doc._id)
    })

    // Set the roll status
    rollInfo.innerHTML = "Press button to roll";
    console.log("Dice area reset");
  }

  /*
  * Returns all items in the Items collection
  */
  Template.dice.all_items = function() {
    console.log("Mongo DB querry for dice values");
    return Rolls.find();
  }

  Template.dice.all_duplicates = function() {
    if (Duplicates.find()==null) {
      return 'None';
    } else {
       return Duplicates.find();
    }
   
  }

  /*
  * Template for add_dice events
  */
  Template.dice.events({

    'click .button_roll': function() {
      
      Session.set("total", 0);
      
      // Reset the dice before rolling again
      resetDiceArea();
     
      // Set number of sides
      var numSides = setNumSides();
      
      // Set number of dice
      var numDice = setNumDice();
      
      // Set totals at 0
      var total = 0;

      var duplicates = [];

      for (var i = 0; i < numSides; i++) {
        duplicates[i] = 0;
      }

      
      // Roll X number of dice Y times and insert them into Rolls collection
      for (var i = 1; i <= numDice; i++) {

        // Get the random number
        var random = (Math.floor(Math.random() * numSides) + 1);

        // Insert the number into the duplicate matrix
        duplicates[random] = (duplicates[random] + 1);

        // Insert item and values into database
        Rolls.insert({rollSequence: Session.get("rollSequence"), sequence: i, value: random, numDice: numDice, numSides: numSides });

        // Set the session total
        Session.set("total", Session.get("total") + random);
       
      };

      // TODO: Not sure...
      //Duplicates.remove({});

      for (var i = 0; i < numSides; i++) {
        if (duplicates[i] > 1) {
          Duplicates.insert({duplicate: i, duplicates: duplicates[i]});
        }  
      }

      // Set the roll sequence to zero if it is null.
      if (Session.get("rollSequence")==null) {
        Session.set("rollSequence", 0);
      }
      
      // Set the roll sequence
      Session.set("rollSequence", (Session.get("rollSequence") + 1 ) );

      // Set the number of dice
      Session.set("numDice", numDice);

      // Set the number of sides
      Session.set("numSides", numSides);

      // Find the average
      if (Session.get("total") % Session.get("numDice") === 0 ) {
        Session.set("average", (Session.get("total") / Session.get("numDice") ) );
      } else {
        Session.set("average", Session.get("total") + "/" + Session.get("numDice") + " or approx " + 
          parseFloat((Session.get("total") / Session.get("numDice")).toPrecision(3)));
      }
     
    
      
      // Set the roll status
      rollInfo.innerHTML = "You rolled " + numDice + 
                              " dice with " + numSides + 
                              " sides each for a total of: " + Session.get("total"); 
      console.log("Roll button clicked");    


    }

  });//End template

 




  
}//End client-side







