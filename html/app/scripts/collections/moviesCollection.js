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

            //parse each movie, see if it exists, if not, lets add it
            //if so, we extend it.
            
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
                        
                        //put the kino int he showTime kino list
                        // showTime.allKinos.push( existingKino.thisKino );

                        existingKino.show_times.push( showTime );
                    }
                    else
                    {
                        //let's add the kino and the time
                        cinemas[ thisKino ] = {     kino_name : thisKino,
                                                    show_times: [ showTime ] };
                    }
                    thisMovie.cinemas = cinemas;

                    //neither omit here or below is working
                    thisMovie = _.omit( thisMovie, [ 'kinos', 'cinema' ] );
                }
                else
                {
                    // console.log( 'this wasnt there already', movie.title );
                    movie.cinemas = {};

                    // showTimeArray = movie.showTimes;

                    // movie.showTimes = 
                    // {
                        
                    // }
                    

                    movie.cinemas[ thisKino ] = {   kino_name : thisKino,
                                                    show_times: [ showTime ] 
                                                };
                    // movie.showTimes[ showTime ].allKinos = [ thisKino ];

                    movie = _.omit( movie, [ 'kinos', 'cinema' ] );

                    refinedMovies.push( movie );
                }

            } );
                // console.log( refinedMovies );
                return refinedMovies;
        }
		
	});
});
