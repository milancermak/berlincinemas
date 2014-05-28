define([
	'backbone'
],
function(Backbone){
    'use strict';

	return Backbone.Router.extend({
		/* Backbone routes hash */
		routes: {
            'freiluft/:param'      : 'showFreiluftKinos', 
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


        showFreiluftKinos : function ( param )
        {
            console.log( 'YOU WANTED FREILUFT KINOS', param );
        }
	});
});
