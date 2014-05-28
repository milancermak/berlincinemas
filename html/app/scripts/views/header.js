define([
	'backbone',
    'communicator',
	'hbs!tmpl/header',
    'collections/moviesCollection',
    'collections/kinos',
],
function(Backbone, Communicator, Header_tmpl, MoviesCollection,
    KinosCollection ){
    'use strict';

	return Backbone.View.extend({

		events :
		{
			'click .js-toggle--showAllFilms' : 'showAllFilms',
			'click .js-toggle--showOnlyOV' : 'showOnlyOV'
		},

		userLocation : {},

		/*
		* Show All show
		*
		* Triiggers the SHOW_ALL Movies event.
		*/
		showAllFilms: function ( e )
		{
			e.preventDefault();

			var movies
				console.log( 'showing all films' );

			Communicator.mediator.trigger( 'MOVIES:SHOW_ALL' );

		},

		/*
		* Show OV
		*
		* Triiggers the SHOW_ONLY_OV.
		*/
		showOnlyOV: function ( e )
		{
			e.preventDefault();
				console.log( 'showing ov only' );
			Communicator.mediator.trigger( 'MOVIES:SHOW_ONLY_OV' );
		},

		initialize: function() {
            var self = this;

			_.bindAll( this, 'getLocation', 'useLocation' );

			console.log("initialize a Header View");
			// console.log( this );
			this.template( Header_tmpl );

            Communicator.mediator.on( 'MOVIES:FETCH', self.updateMovies );
            Communicator.mediator.on( 'KINOS:FETCH', self.updateKinos );


			this.getLocation();

            if( ! Communicator.collections.movies )
            {
                Communicator.collections.movies  =  new MoviesCollection();

            }

            if( ! Communicator.collections.kinos )
            {
                Communicator.collections.kinos  =  new KinosCollection();

            }

		},

        updateMovies : function ( e )
        {
            console.log( 'COMS::: Movies fetch was triggered' );

            Communicator.collections.movies.fetch().done( function( )
            {
                console.log( 'App.collections.movies FETCHED by HEADER' );
                // App.collections.kinos = this.collection;

                // console.log( self.collection.toJSON() );
                Communicator.mediator.trigger('MOVIES:UPTODATE');
            });
        },

        updateKinos : function ( e )
        {
            console.log( 'COMS::: Kinos fetch was triggered' );

            Communicator.collections.kinos.fetch().done( function( )
            {
                console.log( 'App.collections.kinos FETCHED by HEADER' );
                // App.collections.kinos = this.collection;

                // console.log( self.collection.toJSON() );
                Communicator.mediator.trigger('KINOS:UPTODATE');
            });
        },



		getLocation : function ( )
		{
			var self = this;

			console.log( "location is being found." );

			if (Modernizr.geolocation)
			{
			    navigator.geolocation.getCurrentPosition( self.useLocation );
		    }
			else
			{
			    // no native support; maybe try a fallback?
			}
		},


		useLocation : function( location )
		{
			// console.log( 'blabla location',location );

			console.log( 'FIRST LOCATION THING' );
			Communicator.user.location = location;

			Communicator.mediator.trigger( 'USER:HAS_LOCATION', location );


		},


    	serializeData: function()
		{
		    viewData = { "headerText": "foo" };
		    // console.log( 'seriasss' );
		    return viewData;
	    },

		template: function ( Header_tmpl )
		{
			var headerTmpl = Header_tmpl;

			// return Header_tmpl;

			this.$el.append( headerTmpl({ headerText: "Kinos Today:" }) );

		}
	});
});
