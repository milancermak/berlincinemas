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
		},
		
    	template: MovieitemTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
