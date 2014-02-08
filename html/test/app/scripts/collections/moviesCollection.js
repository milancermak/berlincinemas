define([
	'backbone',
	'models/movie'
],
function( Backbone, Movie ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Moviescollection collection");
		},

		model: Movie,

		// url: 'http://fidgetmag.co.uk/berlin/cinemas/today',
		url: 'fake-response.js',

		// parse : function ( response )
		// {
		// 	console.log( 'parsessss', response );

  //           var movies = response.movies;


		// 	return response.movies;
		// },


        parse: function( response )
        {
            var self = this;

            var refinedMovies = [];

            _.each( response.movies, function ( movie, i ) 
            {
                // console.log( movie );
                var thisMovie = _.findWhere( refinedMovies, { title: movie.title }) ;
                // console.log( movie.title, thisMovie );
                if( thisMovie )
                {

                    //update it

                    console.log( 'its already there', thisMovie );

                    var kinos = thisMovie.kinos;
                    var showTimes = thisMovie.showTimes;

                    if( ! kinos )
                    {
                        kinos = [];
                    }
                    
                    if( ! showTimes )
                    {
                        thisMovie.showTimes = [];
                    }

                    var thisKino = movie.cinema;
                    var showTime = moment( Date.parse( movie.date ) );
                    // var showTime = new Date( Date.parse( movie.date ) );

                    if( kinos[ thisKino ] )
                    {
                        //this kino is already there!
                        kinos[ thisKino ].push( showTime )
                        thisMovie.showTimes.push( showTime )
                    }
                    else
                    {
                        //let's add the kino and the time
                        kinos[ thisKino ] = [ showTime ];

                    }

                    thisMovie.kinos = kinos;

                }
                else
                {
                    console.log( 'this wasnt there already', movie.title );

                    // movie = {}

                    // refinedMovies = _.extend( refinedMovies, movie );
                    refinedMovies.push( movie );

                    // refinedMovies = 
                }


            } );
                console.log( refinedMovies );
                return refinedMovies;
        }
		
	});
});
