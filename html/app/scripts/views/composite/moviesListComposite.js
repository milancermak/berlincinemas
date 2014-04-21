define([
	'backbone',
	'communicator',
	'views/header',
	'views/item/movieItem',
	'collections/moviesCollection',
	'hbs!tmpl/composite/moviesListComposite_tmpl'
],
function( Backbone, Communicator, Header, Movieitem, moviesCollection, MoviesListCompositeTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Movieslistcomposite CompositeView");

			_.bindAll( this, 'initialize', 'sortByLocation' )

            if( ! this.collection )
            {
        		this.collection  =  new moviesCollection();
                this.collection.fetch();

                Communicator.collections.movies = this.collection;

				Communicator.mediator.on( 'USER:HAS_LOCATION', this.sortByLocation );

				if( Communicator.user && Communicator.user.location )
				{
					this.sortByLocation( Communicator.user.location );
				}


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
		onRender: function() {},

		/**
		* Sort by LOCATION
		*
		* triggered by an event or manually, if the headerview.userLocation
		* attribute is set.
		*/
		sortByLocation : function ( location )
		{
			console.log( 'WE HAVE THE LOCATION (movies view)', location );
		}
	});

});
