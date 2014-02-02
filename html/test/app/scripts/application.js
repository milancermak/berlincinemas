define([
	'backbone',
	'communicator',
	'views/header',
	'views/footer',
	'views/composite/moviesListComposite',
],

function( Backbone, Communicator, Header, Footer, MoviesListComposite,
			moviesCollection ) {
    'use strict';

	// var welcomeTmpl = Welcome_tmpl;

	var App = new Backbone.Marionette.Application();

	/* Add application regions here */
	App.addRegions({
		header: 		'#header', 
		main: 			'#mainContent',
		footer: 		'#footer'
	});

	/* Add initializers here */
	App.addInitializer( function () {
		App.header.show( new Header );
		App.footer.show( new Footer );
		App.main.show( new MoviesListComposite );
		// document.body.innerHTML = welcomeTmpl({ success: "BLABLA!" });
		Communicator.mediator.trigger("APP:START");
	});
	console.log( App );
	return App;
});
