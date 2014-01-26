define([
	'backbone',
	'views/item/movieItem',
	'hbs!tmpl/composite/moviesListComposite_tmpl'
],
function( Backbone, Movieitem, MovieslistcompositeTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Movieslistcomposite CompositeView");
		},
		
    	itemView: Movieitem,
    	
    	template: MovieslistcompositeTmpl,
    	

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: "",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
