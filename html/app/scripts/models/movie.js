define([
	'backbone',
	'communicator',
    'moment'
],
function( Backbone, Communicator, Moment ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		// initialize: function() {
		// },

		defaults: {},

		idAttribute : 'title',

    initialize: function()
    {
        var moment = Moment;


		console.log("initialize a Movie model");


        _.bindAll ( this
			, 'initialize'
			, 'parse'
			, 'getYoutubeJson'
			, 'setClosestDistance'
			, 'setSaved'
		 );

        var showTime =  moment( Date.parse( this.get('date') ) );

        // Add a list of kinos
        var kinoObj = {};

        kinoObj[ this.get( 'cinema' ) ] = [ showTime ];

        this.set( 'kinos', kinoObj );
        this.set( 'showTimes', [ showTime ] );

		// console.log( this );

        this.setOriginalLanguage();

        this.getYoutubeJson();
		// this.on( 'change', Communicator.mediator.trigger('MOVIES:CHANGED') );

		// Communicator.mediator.on( 'KINOS:UPTODATE', this.setClosestDistance );
		// Communicator.mediatorger('KINOS:UPTODATE');


		// this.setClosestDistance();

		// this.on( 'setSaved', setSaved );
		//
		this.setSaved();
   },


	setSaved : function( )
	{
		var title = this.get( 'title' );
		var savedMovies = Communicator.cookie.savedMovies;

		// console.log(  'saved mov/ies!!', savedMovies );

		if( savedMovies[ title ] && title )
		{
			console.log( 'setting this to be saved' );
			this.set( 'saved', true );

			console.log( this.toJSON() );
		}
		else
		{
			this.set( 'saved', false );
		}

		this.trigger ('change:saved' );



		// console.log( 'ios this saved?', this.get( 'saved' ) );
	},

	setClosestDistance : function ( )
	{
		// console.log( 'JSON', this.toJSON() );
		// LETS GET THE MOVIE DISTANCE
			var self = this;

			var kinosCollection = Communicator.collections.kinos;
			// Communicator.collections.kinos

			var kinosForThisMovie = this.get( 'cinemas' );

			var distance = 9999999999;

			// console.log( 'KINOSFORTHISMOVIE', kinosForThisMovie );
			// console.log( 'KINOSFORTcollectionIE', kinosCollection );

			_.each( kinosForThisMovie, function( cinema )
			{
				var thisKino = kinosCollection.get( cinema.kino_name );

				// console.log( 'KINO NAME', cinema.kino_name );


				// if( thisKino && thisKino.get( 'distance' ) && distance < thisKino.get( 'distance' ) )
				if( thisKino  )
				{
				// console.log( 'THAT KINO', thisKino.get( 'distance' ) );

					if( distance > thisKino.get( 'distance' ) )
					{
						distance = thisKino.get( 'distance' );

					}
				}


				// console.log( 'A KINO', thisKino );
			} );

			this.set( 'nearestKino', distance, { silent: true } );

			// console.log( 'distance is...', this.get( 'nearestKino' ) );

			// var theKinoFromCollection = kinosCollection.get( thisKino );

			// console.log( 'KINONNONON???', theKinoFromCollection );


	},



   setOriginalLanguage : function( )
   {
        var self = this;

        if( self.get('title') )
        {
            var omuPosition = self.get( 'title' ).search( 'OmU' );
            var ovPosition = self.get( 'title' ).search( 'OV' );

            if( omuPosition > 0 || ovPosition > 0 )
            {
                self.set( 'original', true )
            }
            else
            {
                self.set( 'original', false )
            }
        }

   },

   getYoutubeJson : function ( )
   {
        var uriTitle    = encodeURIComponent( this.get('title') ),
            url         = 'http://gdata.youtube.com/feeds/api/videos?q=' + uriTitle + '&alt=json',
            self        = this;

        // console.log( 'things', uriTitle, url );

        $.ajax(
        {
            type : 'get',
            dataType: 'json',
            contentType: "application/json",
            url  : url
        } )
        .then( function( resp, a, xhr )
        {
            var response = resp.feed.entry;
            // console.log( resp );
            if( response )
            {
                //it has responses. so we're winning
                // console.log( 'REPSONSE', response );
                var youtube_link = response[0].link[0].href,
                    youtube_media = response[0].media$group,
                    youtube_thumb = youtube_media.media$thumbnail[0].url; //the first thumb;
                    // youtube_description = response[0]; //the first thumb;


                self.set( {
                    'link'      : youtube_link,
                    'thumbnail' : youtube_thumb,
					'description' : youtube_media.media$description.$t
                }, { 'silent': true } );
                // });

				self.trigger( 'hasYouTube' );


                // response[0]

            }

        });

   }



    });
});
