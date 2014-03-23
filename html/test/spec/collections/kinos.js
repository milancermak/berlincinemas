(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/kinos'
		],
		function( Kinos ) {

			describe('Kinos Collection', function () {

				it('should be an instance of Kinos Collection', function () {
					var kinos = new Kinos();
					expect( kinos ).to.be.an.instanceof( Kinos );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );