define([
	'backbone',
	'views/item/movieItem',
	'collections/moviesCollection',
	'hbs!tmpl/composite/moviesListComposite_tmpl'
],
function( Backbone, Movieitem, moviesCollection, MoviesListCompositeTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Movieslistcomposite CompositeView");
		
			this.collection  =  new moviesCollection();

			console.log( this.collection );
		},
		
    	itemView: Movieitem,
    	
    	template: MoviesListCompositeTmpl,
    	

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: ".moviesss",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
