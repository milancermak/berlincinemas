(function() {
	'use strict';

	var root = this;

	root.define([
		'regions/mainContent'
		],
		function( Maincontent ) {

			describe('Maincontent Region', function () {

				it('should be an instance of Maincontent Region', function () {
					var mainContent = new Maincontent();
					expect( mainContent ).to.be.an.instanceof( Maincontent );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );