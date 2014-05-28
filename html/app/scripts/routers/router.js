define([
	'backbone'
    ,'views/composite/kinoListComposite'
    ],
function(Backbone, KinoListComposite){
    'use strict';

    // var Appp = require( ['application'] );
    
    return Backbone.Router.extend({
        /* Backbone routes hash */
        routes: {
            'kinos/:param'      : 'showKinos', 
            '*things'             : 'startPage',

        },

        initialize : function( )
        {
            console.log( 'ROUTER' );
        },


        startPage : function ( )
        {
            console.log( 'DEFAULT PAGE' );



        },


        showKinos : function ( param )
        {
            console.log( 'SHOW KINOS PAGE' );
            // if( param !== 'freiluft' )
            // {
            //     App.main.show( new KinoListComposite );
            // }

            if( param )
            {
                // var remove = App.main.currentView.collection.where( { 'onAtFreiluft' : false } );

                App.main.currentView.collection.lookingForKino = param;
                console.log( 'FREI', App.main.currentView );


                // debugger;

                // console.log( 'frei to go', remove );
                

                //better way for thi could be get the full collection and upon 
                //reset or so, remove everything that isnt freiluft. MAYBE.
                //
                //ORRRR. Check for an indexOf bla.
            }

        }
	});
});
