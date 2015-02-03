(function(){

window.secondApp = {
	Models: {},
	Collections: {},
	Views: {}
};


window.template = function(id){
	return _.template( $('#' + id).html() );
}


// Person Model
secondApp.Models.Person = Backbone.Model.extend({
	defaults:{
		name: 'John',
		age: 30,
		occupation: 'worker'
	}
});


// Collection
secondApp.Collections.People = Backbone.Collection.extend({
	model: secondApp.Models.Person
});


// View for all people
secondApp.Views.People = Backbone.View.extend({
	tagName: 'ul',

	render: function(){
		this.collection.each(function(person){
			var personView = new secondApp.Views.Person({ model:person });
			this.$el.append(personView.render().el);
		}, this);
		return this;
	}

});


// View for a person
secondApp.Views.Person = Backbone.View.extend({
	tagName : 'li',

	template: template('personTemplate'),

	render: function(){
		this.$el.html( this.template(this.model.toJSON()));
		return this;
	}
});


peopleCollection = new secondApp.Collections.People([
	{
		name: 'Alex Tenche',
		age: 36
	},
	{
		name: 'Blade Daywalker',
		age: 43,
		occupation: 'vampire slayer'
	},
	{
		name: 'Lucy',
		age: 35,
		occupation: '100% brain usage'
	}
]);

var peopleView = new secondApp.Views.People({ collection: peopleCollection });
$(document.body).append(peopleView.render().el);

console.log(secondApp.Collections);

})();