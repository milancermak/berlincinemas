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
		    if( ! this.collection )
            {
        		this.collection  =  new moviesCollection();
                this.collection.fetch();

                App.collections = {};

                App.collections.movies = this.collection;
                
            }
			// console.log( this.collection );
		},
		
    	itemView: Movieitem,
    	
    	template: MoviesListCompositeTmpl,
    	

    	/* ui selector cache */
    	ui: {},

    	/* where are we appending the items views */
    	itemViewContainer: ".movies",

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {}
	});

});
