(function() {
	'use strict';

	var root = this;

	root.define([
		'views/header'
		],
		function( Header ) {

			describe('Header View', function () {

				it('should be an instance of Header View', function () {
					var header = new Header();
					expect( header ).to.be.an.instanceof( Header );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );