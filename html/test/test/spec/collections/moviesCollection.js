(function() {
	'use strict';

	var root = this;

	root.define([
		'collections/moviesCollection'
		],
		function( Moviescollection ) {

			describe('Moviescollection Collection', function () {

				it('should be an instance of Moviescollection Collection', function () {
					var moviesCollection = new Moviescollection();
					expect( moviesCollection ).to.be.an.instanceof( Moviescollection );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );