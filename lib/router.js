/*
* Filename: router.js
* Author: Joshua Michael Waggoner (rabbitfighter81@gmail.com)
* GitHub: www.github.com/DMware
*/

/*
* Configure the new router to point to layout template
*/

Iron.utils.debug = true;

Router.configure({
	layoutTemplate:'layout'
});

/*
* Map routes.
*/
Router.map(function(){
	this.route('home', {path: '/'});
	this.route('dice', {path:'dice'});
	//this.route('characters', {path:'characters'});
	//this.route('timers', {path:'timers'});
	//this.route('events', {path:'events'})
	//this.route('contact', {path: 'contact'});
	//this.route('groups', {path: 'groups'})
});



