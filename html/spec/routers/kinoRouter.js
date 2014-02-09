(function() {
	'use strict';

	var root = this;

	root.define([
		'routers/kinoRouter'
		],
		function( Kinorouter ) {

			describe('Kinorouter Router', function () {

				it('should be an instance of Kinorouter Router', function () {
					var kinoRouter = new Kinorouter();
					expect( kinoRouter ).to.be.an.instanceof( Kinorouter );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );