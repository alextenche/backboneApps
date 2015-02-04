(function(){

window.thirdApp = {
	Models: {},
	Collections: {},
	Views: {}
};

window.template = function(id){
	return _.template( $('#' + id).html() );
}


thirdApp.Models.Task = Backbone.Model.extend({
	validate: function(){
		if(!attrs.title){
			return 'a task requires a valid title';
		}
	}


});


thirdApp.Collections.Tasks = Backbone.Collection.extend({
	model: thirdApp.Models.Task
});


thirdApp.Views.Tasks = Backbone.View.extend({
	tagName: 'ul',

	initialize: function(){
		this.collection.on('add', this.addOne, this);
	},

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

	initialize: function(){
		this.model.on('change', this.render, this);
		this.model.on('destroy', this.remove, this);
	},

	events: {
		'click .edit': 'editTask',
		'click .delete': 'deleteTask'
	},

	editTask: function(){
		var newTaskTitle = prompt('What would you like to change the text to?', this.model.get('title'));

		if(! $.trim(newTaskTitle) ) return;

		this.model.set('title', newTaskTitle);
	},

	deleteTask: function(){
		this.model.destroy();
		console.log(tasksCollection);
	},

	remove: function(){
		this.$el.remove();
	},

	render: function(){
		var template = this.template( this.model.toJSON());
		this.$el.html( template );
		return this;
	}
});


thirdApp.Views.AddTask = Backbone.View.extend({
	el: '#addTask',

	events:{
		'submit': 'submit'
	},

	initialize: function(){},

	submit: function(event){
		event.preventDefault();

		var newTaskTitle = $(event.currentTarget).find('input[type=text]').val();

		var task = new thirdApp.Models.Task({ title:newTaskTitle });
		this.collection.add(task);
	}
});


window.tasksCollection = new thirdApp.Collections.Tasks([
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

var addTaskView = new thirdApp.Views.AddTask({ collection: tasksCollection })

var tasksView = new thirdApp.Views.Tasks({ collection: tasksCollection });
$('.tasks').html(tasksView.render().el);


})();