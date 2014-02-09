define([
	'backbone',
	'hbs!tmpl/item/movieItem_tmpl'
],
function( Backbone, MovieitemTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Movieitem ItemView");

            // console.log( this.model.kinos );
		},
		
    	template: MovieitemTmpl,

        className: "movie-box",
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {

            this.showKinos();
        },

        showKinos : function ()
        {
            var cinemas = this.model.get( 'cinemas' );
            var cinemaList = this.$( '.js-movie__cinemas' );

            console.log( cinemaList );

            // console.log( kinos );
            _.each( cinemas, function( cinema, i)
            {
                cinemaList.append( '<li class="cinema">' + cinema.kino_name + '</li>');
                // console.log( cinema );
            } );
        }
	});

});
