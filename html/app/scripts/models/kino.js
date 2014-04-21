define([
	'backbone',
	'communicator'
],
function( Backbone, Communicator ) {
    'use strict';

	/* Return a model class definition */
	return Backbone.Model.extend({
		initialize: function() {
			console.log("initialize a Kino model");

            // console.log( 'KINO MODEL', this );

			_.bindAll( this, 'initialize', 'setLatLong', 'setDistance', 'haversine' );

			this.setLatLong();
			this.setDistance();
		},

		defaults: {},

        idAttribute: 'name',

		setLatLong : function ( )
		{
			// console.log( 'setting disstance' , this );

			var latLong = this.get( 'll' ).split( ',');

			// console.log( latLong );

			// this.set( 'latitude', latLong[0] );
			// this.set( 'longitude', latLong[1] );

			this.set( 'location', { latitude: latLong[0], longitude: latLong[1] });
		},

		setDistance : function( )
		{
			// console.log( 'setting distanceee!!!!!' );

			var userLocation = Communicator.user.location;

			if( this.get( 'location' ) && userLocation )
			{
				var kinoLocation = this.get( 'location' );
			// console.log( 'setting distanceee!!aasdsadsadsad!!!' );
				this.set( 'distance', this.haversine( kinoLocation, userLocation.coords ), { silent: true } );


				// console.log( this );

			}

		},

		rad: function ( x )
		{
			return x * Math.PI / 180
		},

		  // Distance in kilometers between two points using the Haversine algo.
		haversine: function ( p1, p2 )
		{
		    var R = 6371
		    var dLat  = this.rad(p2.latitude - p1.latitude)
		    var dLong = this.rad(p2.longitude - p1.longitude)

		    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		            Math.cos(this.rad(p1.latitude)) * Math.cos(this.rad(p2.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2)
		    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
		    var d = R * c

		    return Math.round(d)
		}



    });
});
