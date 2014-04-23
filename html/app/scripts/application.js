define([
	'backbone',
	'communicator',
	'jquery.cookie',
	'views/header',
	'views/footer',
    'views/composite/moviesListComposite',
	'views/composite/kinoListComposite',
    'collections/moviesCollection',
    'collections/kinos',
],

function( Backbone,
	Communicator,
	Cookie,
	Header,
	Footer,
	MoviesListComposite,
	KinoListComposite,
	MoviesCollection,
	KinoCollection ) {
    'use strict';


	var App = new Backbone.Marionette.Application();

	//lets set cookie to json globally in the app
	$.cookie.json = true;


	Communicator.cookie = $.cookie( 'kinos' );

	if( ! Communicator.cookie )
	{
		Communicator.cookie = {};

	}

	if( ! Communicator.cookie.savedMovies )
	{
		Communicator.cookie.savedMovies = {};

	}


    //collections object
    Communicator.collections = {};
    Communicator.user = {};

    window.App = App;
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
        App.main.show( new MoviesListComposite );
        // App.main.show( new KinoListComposite );


        // document.body.innerHTML = welcomeTmpl({ success: "BLABLA!" });
		Communicator.mediator.trigger("APP:START");
	});


	// console.log( App );
	return App;
});