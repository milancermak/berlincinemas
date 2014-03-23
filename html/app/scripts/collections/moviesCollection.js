define([
	'backbone',
    'communicator',
	'models/movie',
    'collections/kinos'
],
function( Backbone, Communicator, Movie, KinosCollection ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function( ) {
			var self = this;
            _.bindAll( this );

            console.log("initialize a Moviescollection collection" );

            this.on( 'change', Communicator.mediator.trigger('MOVIES:CHANGED') );

            // Communicator.mediator.on('KINOS:UPTODATE', self.updateKinos );
		},

		model: Movie,

		// url: 'http://fidgetmag.co.uk/berlin/cinemas/today',
		url: 'fake-response.js',

        updateKinos : function ( e )
        {
            var self = this;
            console.log( 'UPDATING KINOS' );
            var kinosCollection = App.collections.kinos;

            if ( kinosCollection )
            {
                // App.collections.kinos = new KinosCollection();
                // kinosCollection = App.collections.kinos;
                // kinosCollection.fetch();

            }

            console.log( 'kinosCollection AS MOVIES', kinosCollection, self );

            _.each( self, function( movie)
            {
                console.log( movie );
            } );

        },

        parse: function( response )
        {
            var self = this;

            // console.log( 'parsing', response );

            var refinedMovies = [];


    

            //parse each movie, see if it exists, if not, lets add it
            //if so, we extend it.
            
            _.each( response.movies, function ( movie, i ) 
            {
                var thisMovie = _.findWhere( refinedMovies, { title: movie.title }) ;

                var thisKino = movie.cinema;

                // var theKINO = kinosCollection.get( thisKino );


                // console.log( thisKino, 'kino from the movie', theKINO );

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
