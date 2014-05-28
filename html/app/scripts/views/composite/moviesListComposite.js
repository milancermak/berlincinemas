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

			_.bindAll( this, 'initialize', 'sortByLocation', 'showSavedFirst' )



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


			this.collection.on( 'reset', this.showSavedFirst );

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
		onRender: function() {
			// this.showSavedFirst();


            // if( this.showingFreiluft === true )
            // {
            //     console.log( 'MOVIES LIST IS FREIII' );
            // }

            // debugger;
		},


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

				// this.collection.comparator( 'nearestKino' );
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

			this.showSavedFirst();

		},


		showSavedFirst : function ( )
		{
			// console.log( 'showing saved first::::' );
			// this.collection.comparator = '';

			//
			// console.log( 'saved movies from COLLECTION::::', savedMovies );
			var self = this;

			var savedMovies = $( '.js-saved' );
			// console.log( 'WITH JQ', savedMovies );
			_.each( savedMovies, function moveSavedMovies( movie )
			{
				// console.log( 'EL', self.$el );
				$( self.itemViewContainer ).prepend( movie );
				// movie.
			} );

			// var modelMovies = this.collection.where( { saved: true } );
			// _.each( modelMovies, function triggerYoutubeMovies( movie )
			// {
			// 	movie.getYoutubeJson();
			//
			// } );


		//collection strategy not working
			// var modelMovies = this.collection.where( { saved: true } );
			// _.each( savedMovies, function moveSavedMovies( movie )
			// {
			// 	self.collection.unshift( movie, { sort: false } );
			//
			//
			// } );
			//
			// console.log(  'FIIIRRRSSSTTT', this.collection.first() );
			//
			//
			// this.render( );

			// this.collection.sort();
			// this.collection.trigger( 'reset' );
		}

	});

});
