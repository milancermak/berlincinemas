define([
	'backbone',
	'views/item/movieItem'
],
function( Backbone, Movieitem  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.CollectionView.extend({

		initialize: function() {
			console.log("initialize a Movieslist CollectionView");
		},

    	itemView: Movieitem,

		// comparator : 


    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
