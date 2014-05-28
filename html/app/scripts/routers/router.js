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
            if( param !== 'freiluft' )
            {
                App.main.show( new KinoListComposite );
            }

        }
	});
});
