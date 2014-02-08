define([
	'backbone'
],
function( Backbone ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		// initialize: function() {
		// },

		defaults: {},

		  // idAttribute : 'title',

    initialize: function() 
    { 
		console.log("initialize a mmmMovie model");
        _.bindAll ( this, 'initialize', 'parse' );

        var showTime =  moment( Date.parse( this.get('date') ) );


        // Add a list of kinos
        var kinoObj = {};

        kinoObj[ this.get( 'cinema' ) ] = [ showTime ];  
        
        this.set( 'kinos', kinoObj );
        this.set( 'showTimes', [ showTime ] );

        this.setOriginalLanguage();

        // this.getYoutubeJson();

   },

   setOriginalLanguage : function( )
   {
        var self = this;
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


                self.set( {
                    'link'      : youtube_link,
                    'thumbnail' : youtube_thumb
                });

                // console.log( self );

                // response[0]
                
            }
        
        });

   }



    });
});
