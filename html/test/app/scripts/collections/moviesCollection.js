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
                    // console.log( 'its already there', thisMovie );

                    var cinemas = thisMovie.cinemas;
                    var showTimes = thisMovie.showTimes;

                    if( ! cinemas )
                    {
                        cinemas = {};
                    }

                    if( ! showTimes )
                    {
                        thisMovie.showTimes = [];
                    }

                    var thisKino = movie.cinema;
                    var showTime = moment( Date.parse( movie.date ) );
                    // var showTime = new Date( Date.parse( movie.date ) );
                    var existingKino = _.findWhere( cinemas, thisKino );

                    // console.log( existingKino );

                    if( existingKino )
                    {
                        //this kino is already there!
                        existingKino.show_times.push( showTime )
                        thisMovie.showTimes.push( showTime )
                    }
                    else
                    {
                        // console.log( 'lets adda  kno' );
                        //let's add the kino and the time
                        cinemas[ thisKino ] = {   kino_name : thisKino,
                                                show_times: [ showTime ] };
                    }
                    thisMovie.cinemas = cinemas;
                    thisMovie = _.omit( thisMovie, [ 'kinos', 'cinema' ] );
                }
                else
                {
                    // console.log( 'this wasnt there already', movie.title );


                    // maybe this isnt happening all the time, the parsing to the times etc.
                    movie = _.omit( movie, [ 'kinos', 'cinema' ] );

                    // refinedMovies = _.extend( refinedMovies, movie );
                    refinedMovies.push( movie );

                    // refinedMovies = 
                }




            } );
                // console.log( refinedMovies );
                return refinedMovies;
        }
		
	});
});
