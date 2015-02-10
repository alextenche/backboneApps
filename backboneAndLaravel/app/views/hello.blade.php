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
				completed: 0,
				id: ''
			},
			urlRoot: 'tasks'	
		});
	})();
	</script>

</body>
</html>