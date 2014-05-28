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
            _.bindAll( this, 'initialize' );

            console.log("initialize a Moviescollection collection" );

            // this.on( 'reset', Communicator.mediator.trigger('MOVIES:ADDED') );
            // this.on( 'change', Communicator.mediator.trigger('MOVIES:CHANGED') );

            // Communicator.mediator.on('KINOS:UPTODATE', self.updateKinos );
		},

		model: Movie,

		// comparator : 'saved',
		comparator : 'nearestKino',

		url: function ( )
		{
				if( document.location.hostname === 'localhost' )
				{
					return 'fake-response.js';
				}
				else
				{
					return 'berlin/cinemas/today';

				}
		},

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

			// console.log( response );

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

					// console.log( thisKino );

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


					// var youtube_link = response[0].link[0].href,
					// 	youtube_media = response[0].media$group,
					// 	youtube_thumb = youtube_media.media$thumbnail[0].url; //the first thumb;

                    //neither omit here or below is working
		    thisMovie = _.omit( thisMovie, [ 'kinos', 'cinema', 'youtube' ] );
                }
                else
                {
                    movie.cinemas = {};

					// debugger;
					movie.link = movie.youtube.youtube_link;
					movie.thumbnail = movie.youtube.youtube_thumb;
                    movie.id = movie.title.replace( /\s+/g, '' ).replace( /\)/g, '' ).replace( /\(/g, '' );

					// console.log( movie.youtube.youtube_media [ 'media_description' ] );
					// movie[ 'description'] = movie.youtube.youtube_media.media_description[ '_t' ];
					// movie.description = 'asdasdsa';

                    movie.cinemas[ thisKino ] = {   kino_name : thisKino,
                                                    show_times: [ showTime ]
                                                };

		    movie = _.omit( movie, [ 'kinos', 'cinema', 'youtube' ] );

                    refinedMovies.push( movie );
					// debugger;
                }

            } );
                // console.log( refinedMovies );
            return refinedMovies;
        }

	});
});
