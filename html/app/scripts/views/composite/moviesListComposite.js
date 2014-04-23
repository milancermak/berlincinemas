define([
	'backbone',
	'communicator',
	'views/header',
	'views/item/movieItem',
	'collections/moviesCollection',
	'hbs!tmpl/composite/moviesListComposite_tmpl'
],
function( Backbone
	, Communicator
	, Header
	, Movieitem
	, moviesCollection
	, MoviesListCompositeTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Movieslistcomposite CompositeView");

			_.bindAll( this, 'initialize', 'sortByLocation' )

            if( ! this.collection )
            {
        		this.collection  =  new moviesCollection();
                this.collection.fetch();

                Communicator.collections.movies = this.collection;


				if( Communicator.user && Communicator.user.location )
				{
					this.sortByLocation( Communicator.user.location );
				}


            }
			Communicator.mediator.on( 'USER:HAS_LOCATION', this.sortByLocation );
			Communicator.mediator.on( 'MOVIES:UPTODATE', this.sortByLocation );
			Communicator.mediator.on( 'KINOS:UPTODATE', this.sortByLocation );
			// console.log( this.collection );

			// var theCookie = $.cookie ( 'kinos' );
			var theCookie = Communicator.cookie;

			if( theCookie )
			{
				console.log( "CURRENT SAVED MOVIES", theCookie.savedMovies );

			}
			else
			{
				console.log( 'NO COOKIE' );
			}
		},

    	itemView: Movieitem,

    	template: MoviesListCompositeTmpl,


    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: ".movies",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {},

		/**
		* Sort by LOCATION
		*
		* triggered by an event or manually, if the headerview.userLocation
		* attribute is set.
		*/
		sortByLocation : function ( location )
		{
			// console.log( 'WE HAVE THE LOCATION (movies view)', location );

			// console.log( 'SORTING BY LOCATION' );

			if( Communicator.collections.kinos.length > 0 && Communicator.collections.movies.length > 0 )
			{
				//This should be event based rather than depending upon THISSSS
				this.collection.each( function( movieModel )
				{
					movieModel.setClosestDistance();
				});

				this.collection.sort();

				this.collection.trigger( 'reset' );
				this.collection.each( function eachMovieAfterLocation( movie )
				{
					movie.trigger( 'hasYouTube' );
				} );
			}
			else
			{
				Communicator.mediator.trigger('KINOS:FETCH');
			}
		}
	});

});
