/*
* Filename: publications.js
* Author: Joshua Michael Waggoner
* GitHub: github.com/rabbitfighter81/DMware
*/

/*
* Removed autopublish, now must explicitly publish collections. 
*/

Meteor.publish('rolls', function() {
		return Rolls.find();
});

Meteor.publish('duplicates', function() {
		return Duplicates.find();
});
