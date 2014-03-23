(function() {
	'use strict';

	var root = this;

	root.define([
		'models/kino'
		],
		function( Kino ) {

			describe('Kino Model', function () {

				it('should be an instance of Kino Model', function () {
					var kino = new Kino();
					expect( kino ).to.be.an.instanceof( Kino );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );