define([
	'backbone',
    'communicator',
	'hbs!tmpl/header',
    'collections/moviesCollection',
    'collections/kinos',
],
function(Backbone, Communicator, Header_tmpl, MoviesCollection, 
    KinosCollection ){
    'use strict';

	return Backbone.View.extend({
		initialize: function() {
            var self = this;
			console.log("initialize a Header View");
            var self = this;
			// console.log( this );
			this.template( Header_tmpl );

            Communicator.mediator.on( 'MOVIES:FETCH', self.updateMovies );
            Communicator.mediator.on( 'KINOS:FETCH', self.updateKinos );


            if( ! App.collections.movies )
            {
                App.collections.movies  =  new MoviesCollection();

            }

            if( ! App.collections.kinos )
            {
                App.collections.kinos  =  new KinosCollection();

            }

		},

        updateMovies : function ( e )
        {
            console.log( 'COMS::: Movies fetch was triggered' );

            App.collections.movies.fetch().done( function( )
            {
                console.log( 'App.collections.movies FETCHED by HEADER' );
                // App.collections.kinos = this.collection;
                
                // console.log( self.collection.toJSON() );
                Communicator.mediator.trigger('MOVIES:UPTODATE');
            });
        },

        updateKinos : function ( e )
        {
            console.log( 'COMS::: Kinos fetch was triggered' );

            App.collections.kinos.fetch().done( function( )
            {
                console.log( 'App.collections.kinos FETCHED by HEADER' );
                // App.collections.kinos = this.collection;
                
                // console.log( self.collection.toJSON() );
                Communicator.mediator.trigger('KINOS:UPTODATE');
            });
        },

    	serializeData: function() {
	    viewData = { "headerText": "foo" };
	    // console.log( 'seriasss' );
	    return viewData;
	  },

		template: function ( Header_tmpl )
		{
			var headerTmpl = Header_tmpl;

			// return Header_tmpl;

			this.$el.append( headerTmpl({ headerText: "Kinos Today:" }) );

		}
	});
});
