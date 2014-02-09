(function() {
	'use strict';

	var root = this;

	root.define([
		'regions/header'
		],
		function( Header ) {

			describe('Header Region', function () {

				it('should be an instance of Header Region', function () {
					var header = new Header();
					expect( header ).to.be.an.instanceof( Header );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );