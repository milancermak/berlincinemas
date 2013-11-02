var Movie = Backbone.Model.extend({
    
    // idAttribute : 'title',

    initialize: function() 
    { 
        _.bindAll ( this, 'initialize', 'parse' );

        var showTime = Date.parse( this.get('date') );
        // var dateObj = new Date( showTime );

        // this.set( 'showTime', showTime );

        var kinoObj = 
        { 
        };

        kinoObj[ this.get( 'cinema' ) ] = [ showTime ];  
        

        this.set( 'cinemas', kinoObj );
        this.set( 'showTimes', [ showTime ] );


        // this.set( 'day', dateObj.getDay() );
        // this.set( 'month', dateObj.getMonth() );
   },

});