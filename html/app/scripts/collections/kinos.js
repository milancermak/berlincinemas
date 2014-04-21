define([
	'backbone',
    'communicator',
    'models/kino',
    'collections/moviesCollection'
],
function( Backbone, Communicator, Kino, MoviesCollection ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
            _.bindAll( this );
			console.log("initialize a Kinos collection");

            this.addMovies();

            Communicator.mediator.on( 'MOVIES:UPTODATE', this.addMovies );
            Communicator.mediator.on( 'KINOS:UPTODATE', this.addMovies );
            // this.on( 'change', this.addMovies );
		},

		model: Kino,

		comparator: 'distance',

        // url: 'http://fidgetmag.co.uk/berlin/cinemas/today',
        url: 'fake-response.js',

        addMovies : function( )
        {
            console.log( 'ADDING MOVIES' );

            var self = this;

            console.log( this );

            if( this.length < 1 )
            {
                return;
            }

            var moviesCollection = Communicator.collections.movies.toJSON() ;
            //if there isnt already a movies collection
            //
            console.log( 'MOVIES COLLECTION LENGTH', moviesCollection.length );

            if( moviesCollection.length < 1 )
            {

                Communicator.mediator.trigger("MOVIES:FETCH");
                // App.collections.movies = new MoviesCollection();
                // moviesCollection = App.collections.movies;
                // moviesCollection.fetch();

                // console.log( moviesCollection.toJSON() );
            }
            else
            {
                // console.log( moviesCollection );
                _.each( moviesCollection, function ( movie, i )
                {
                    // console.log( movie );

                    _.each( movie.cinemas, function( kino )
                    {
                        // console.log( kino );

                        var kinoModel = self.get( kino.kino_name );

                        if( kinoModel )
                        {
                            var kinoMovies = kinoModel.get( 'movies' );

                            if ( ! kinoMovies )
                            {
                                var kinoMovies = [ movie ];
                            }
                            else
                            {
                                kinoMovies.push( movie );
                            }

                            kinoModel.set( { 'movies': kinoMovies }, true );

                            // console.log( kinoModel );
                        }


                    } );

                });

            }



            // _.each( response.cinemas, function( cinema )
            // {
            //     console.log( 'cinema title', cinema.name );
            //     var moviesShowing = moviesCollection.find( function( movie )
            //     {
            //         console.log( movie );
            //         return movie.cinemas[ cinema.name ]
            //     } );

            //         // 'cinemas', [ cinema.name ])

            //     console.log( moviesShowing );
            // } );

        },

        parse: function( response )
        {
            var self = this;
            // App.todayResponse

            console.log( response );




            return response.cinemas;
        }


	});
});
