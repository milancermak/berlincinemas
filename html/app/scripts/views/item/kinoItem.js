define([
	'backbone',
	'hbs!tmpl/item/kinoItem_tmpl'
],
function( Backbone, KinoitemTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Kinoitem ItemView");
		},
		
    	template: KinoitemTmpl,
        

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
