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
            var self = this;
            //TODO: check for an init of App Collection
            if( ! this.collection )
            {
                this.collection = App.collections.kinos;
                
                if( App.collections.kinos.length < 1 )
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
		onRender: function() {}
	});

});
