define([
	'backbone',
	'models/movie'
],
function( Backbone, Movie ) {
    'use strict';

	/* Return a collection class definition */
	return Backbone.Collection.extend({
		initialize: function() {
			console.log("initialize a Moviescollection collection");
		},

		model: Movie,

		// url: 'http://fidgetmag.co.uk/berlin/cinemas/today',
		url: 'fake-response.js',

		parse : function ( response )
		{
			console.log( 'parsessss', response );

			return response.movies;
		}
		
	});
});
