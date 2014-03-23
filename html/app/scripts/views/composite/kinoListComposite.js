define([
	'backbone',
	'views/item/kinoItem',
    'collections/kinos',
	'hbs!tmpl/composite/kinoListComposite_tmpl'
],
function( Backbone, Kinoitem, kinosCollection, KinolistcompositeTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Kinolistcomposite CompositeView");

            this.collection  =  new kinosCollection();
            this.collection.fetch();
		},
		
    	itemView: Kinoitem,
    	
    	template: KinolistcompositeTmpl,
    	

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: ".kinos",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
