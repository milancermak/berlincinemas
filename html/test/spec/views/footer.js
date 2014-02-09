(function() {
	'use strict';

	var root = this;

	root.define([
		'views/footer'
		],
		function( Footer ) {

			describe('Footer View', function () {

				it('should be an instance of Footer View', function () {
					var footer = new Footer();
					expect( footer ).to.be.an.instanceof( Footer );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );