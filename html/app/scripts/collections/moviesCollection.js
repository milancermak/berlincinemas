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

            console.log( response );

            var refinedMovies = [];

            _.each( response.movies, function ( movie, i ) 
            {
                var thisMovie = _.findWhere( refinedMovies, { title: movie.title }) ;

                var thisKino = movie.cinema;
                var showTime = moment( Date.parse( movie.date ) );

                if( thisMovie )
                {
                    var cinemas = thisMovie.cinemas;

                    if( ! cinemas )
                    {
                        cinemas = {};
                    }

                    var existingKino = _.findWhere( cinemas, { 'kino_name' : thisKino } );

                    if( existingKino )
                    {
                        //this kino is already there!
                        existingKino.show_times.push( showTime );
                    }
                    else
                    {
                        //let's add the kino and the time
                        cinemas[ thisKino ] = {     kino_name : thisKino,
                                                    show_times: [ showTime ] };
                    }
                    thisMovie.cinemas = cinemas;
                    thisMovie = _.omit( thisMovie, [ 'kinos', 'cinema' ] );
                }
                else
                {
                    // console.log( 'this wasnt there already', movie.title );
                    movie.cinemas = {};

                    movie.cinemas[ thisKino ] = {   kino_name : thisKino,
                                                    show_times: [ showTime ] 
                                                };
                    movie = _.omit( movie, [ 'kinos', 'cinema' ] );

                    refinedMovies.push( movie );
                }

            } );
                // console.log( refinedMovies );
                return refinedMovies;
        }
		
	});
});
