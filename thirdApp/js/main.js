(function(){

window.thirdApp = {
	Models: {},
	Collections: {},
	Views: {}
};

window.template = function(id){
	return _.template( $('#' + id).html() );
}


thirdApp.Models.Task = Backbone.Model.extend({});


thirdApp.Collections.Tasks = Backbone.Collection.extend({
	model: thirdApp.Models.Task
});


thirdApp.Views.Tasks = Backbone.View.extend({
	tagName: 'ul',

	render: function(){
		this.collection.each(this.addOne, this);
		return this;
	},

	addOne: function(task){
		// creating a new child view
		var taskView = new thirdApp.Views.Task({ model: task });
		taskView.render();

		// append to the root element
		this.$el.append(taskView.el);
	}
});



thirdApp.Views.Task = Backbone.View.extend({
	tagName: 'li',

	template: template('taskTemplate'),

	events: {
		'click .edit': 'editTask'
	},

	editTask: function(){
		var newTaskTitle = prompt('What would you like to change the text to?', this.model.get('title'));
		this.model.set('title', newTaskTitle);
	},

	render: function(){
		var template = this.template( this.model.toJSON());
		this.$el.html( template );
		return this;
	}
});

var tasksCollection = new thirdApp.Collections.Tasks([
	{
		title: 'go to the store',
		priority: 4
	},
	{
		title: 'go to the mall',
		priority: 3
	},
	{
		title: 'go to work',
		priority: 5
	}
]);

var tasksView = new thirdApp.Views.Tasks({ collection: tasksCollection });
tasksView.render();

$('.tasks').html(tasksView.render().el);






})();