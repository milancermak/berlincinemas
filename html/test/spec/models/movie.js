(function() {
	'use strict';

	var root = this;

	root.define([
		'models/movie'
		],
		function( Movie ) {

			describe('Movie Model', function () {

				it('should be an instance of Movie Model', function () {
					var movie = new Movie();
					expect( movie ).to.be.an.instanceof( Movie );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );