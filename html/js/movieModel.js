var Movie = Backbone.Model.extend({
    
    // idAttribute : 'title',

    initialize: function() 
    { 
        _.bindAll ( this, 'initialize', 'parse' );

        var showTime =  moment( Date.parse( this.get('date') ) );


        var kinoObj = {};

        kinoObj[ this.get( 'cinema' ) ] = [ showTime ];  
        

        this.set( 'kinos', kinoObj );
        this.set( 'showTimes', [ showTime ] );

   },

});