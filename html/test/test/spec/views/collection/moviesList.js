(function() {
	'use strict';

	var root = this;

	root.define([
		'views/collection/moviesList'
		],
		function( Movieslist ) {

			describe('Movieslist Collectionview', function () {

				it('should be an instance of Movieslist Collectionview', function () {
					var moviesList = new Movieslist();
					expect( moviesList ).to.be.an.instanceof( Movieslist );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );