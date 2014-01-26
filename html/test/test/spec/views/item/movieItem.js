(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/movieItem'
		],
		function( Movieitem ) {

			describe('Movieitem Itemview', function () {

				it('should be an instance of Movieitem Itemview', function () {
					var movieItem = new Movieitem();
					expect( movieItem ).to.be.an.instanceof( Movieitem );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );