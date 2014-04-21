define([
	'backbone',
    'communicator',
	'views/item/kinoItem',
    'collections/kinos',
	'hbs!tmpl/composite/kinoListComposite_tmpl'
],
function( Backbone, Communicator, Kinoitem, kinosCollection, KinolistcompositeTmpl  ) {
    'use strict';

	/* Return a CompositeView class definition */
	return Backbone.Marionette.CompositeView.extend({

		initialize: function() {
			console.log("initialize a Kinolistcomposite CompositeView");

			_.bindAll( this, 'initialize', 'onRender', 'sortByLocation' );

            var self = this;
            //TODO: check for an init of App Collection
            if( ! this.collection )
            {
                this.collection = Communicator.collections.kinos;

                if( Communicator.collections.kinos.length < 1 )
                {
                    Communicator.mediator.trigger( 'KINOS:FETCH' );
                }
                // else
                // {
                // }
                // this.collection  =  new kinosCollection();
                // this.collection.fetch().done( function( )
                //     {
                //         App.collections.kinos = this.collection;

                //         console.log( self.collection.toJSON() );
                //     });

                //set app wide one
// Communicator.mediator.trigger('KINOS:UPTODATE');

				Communicator.mediator.on( 'KINOS:UPTODATE', this.sortByLocation );
				Communicator.mediator.on( 'USER:HAS_LOCATION', this.sortByLocation );

				if( Communicator.user && Communicator.user.location )
				{
					this.sortByLocation( Communicator.user.location );
				}

            }

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
		onRender: function() {

		},

		/**
		* Sort by LOCATION
		*
		* triggered by an event or manually, if the headerview.userLocation
		* attribute is set.
		*/
		sortByLocation : function ( location )
		{
			console.log( 'the collection!?', this.collection );
			console.log( 'WE HAVE THE LOCATION (kinos view)', location );

			this.collection.sort();
			this.collection.trigger( 'reset' );

			//this.collection reset for the new distances?
		}
	});

});
