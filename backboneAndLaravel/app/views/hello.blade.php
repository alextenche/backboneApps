<!DOCTYPE html>
<html>
<head>
	<title>Backbone and Laravel</title>
</head>
<body>

	<h1>Hello World!!!</h1>

	<script src="js/libs/jquery.js"></script>
	<script src="js/libs/underscore.js"></script>
	<script src="js/libs/backbone.js"></script>

	<script>
	(function(){
		window.App = {
			Models: {},
			Views: {},
			Collections:{}
		};


		App.Models.Task = Backbone.Model.extend({
			defaults: {
				title: '',
				completed: 0
			}
		});


		App.Collections.Tasks = Backbone.Collection.extend({
			model: App.Models.Task,
			url: 'tasks'
		});


		App.Views.Tasks = Backbone.View.extend({
			tagName : 'ul',

			initialize: function(){
				this.collection.on('add', this.addOne, this);
			},

			render: function(){
				this.$el.empty();
				this.collection.each(this.addOne, this);
				return this;
			},

			addOne: function(task){
				var task = new App.Views.Task({ model: task });
				this.$el.append( task.render().el );
			}
			
		});


		App.Views.Task = Backbone.View.extend({
			tagName: 'li',

			initialize: function(){
				this.model.on('destroy', this.remove, this);
			},

			render: function(){
				this.$el.html( this.model.get('title') );
				return this;
			}
		});


	})();
	</script>

</body>
</html>