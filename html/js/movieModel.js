var Movie = Backbone.Model.extend({
    
    // idAttribute : 'title',

    initialize: function() 
    { 
        _.bindAll ( this, 'initialize', 'parse' );

        var showTime =  moment( Date.parse( this.get('date') ) );


        // Add a list of kinos
        var kinoObj = {};

        kinoObj[ this.get( 'cinema' ) ] = [ showTime ];  
        
        this.set( 'kinos', kinoObj );
        this.set( 'showTimes', [ showTime ] );

        this.setOriginalLanguage();

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
   }
});