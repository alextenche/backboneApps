(function(){

window.fourthApp = {
	Models: {},
	Collections: {},
	Views: {},
	Router: {}
};

var vent = _.extend({}, Backbone.Events);

fourthApp.Views.Appointment = Backbone.View.extend({
	initialize: function(){
		vent.on('appointment:show', this.show, this);
	},

	show: function(id){
		console.log('showing the appointment with the id of ' + id);
	}
});


fourthApp.Router = Backbone.Router.extend({
	routes: {
		'':'index',
		'show/:id':'show',
		'download/*filename':'download',
		'search/:query': 'search',
		'appointment/:id': 'showAppointment',
		'*other': 'default'
	},

	index: function(){
		console.log('hello from the index page');
	},

	show: function(id){
		console.log('show page for id of ' + id);
	},

	download: function(filename){
		console.log('download filename ' + filename );
	},

	search: function(query){
		console.log( query );
	},

	default: function(other){
		alert('Intresting ! You accessed to: ' + other);
	},

	showAppointment: function(appointmentId){
		vent.trigger('appointment:show', appointmentId);
	}

});

new fourthApp.Views.Appointment;

new fourthApp.Router;
Backbone.history.start();

})();