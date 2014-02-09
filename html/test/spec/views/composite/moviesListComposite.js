(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/moviesListComposite'
		],
		function( Movieslistcomposite ) {

			describe('Movieslistcomposite Compositeview', function () {

				it('should be an instance of Movieslistcomposite Compositeview', function () {
					var moviesListComposite = new Movieslistcomposite();
					expect( moviesListComposite ).to.be.an.instanceof( Movieslistcomposite );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );