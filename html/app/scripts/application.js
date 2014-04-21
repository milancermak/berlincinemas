define([
	'backbone',
	'communicator',
	'views/header',
	'views/footer',
    'views/composite/moviesListComposite',
	'views/composite/kinoListComposite',
    'collections/moviesCollection',
    'collections/kinos',
],

function( Backbone, Communicator, Header, Footer, MoviesListComposite,
			KinoListComposite, MoviesCollection, KinoCollection ) {
    'use strict';


	var App = new Backbone.Marionette.Application();

    //collections object
    Communicator.collections = {};
    Communicator.user = {};

    // window.App = App;
    /* Add application regions here */
    App.addRegions({
        header:         '#header',
        main:           '#mainContent',
        footer:         '#footer'
    });

    /* Add initializers here */
    App.addInitializer( function () {
        App.header.show( new Header );
        App.footer.show( new Footer );
        // App.main.show( new MoviesListComposite );
        App.main.show( new KinoListComposite );


        // document.body.innerHTML = welcomeTmpl({ success: "BLABLA!" });
		Communicator.mediator.trigger("APP:START");
	});


	// console.log( App );
	return App;
});
