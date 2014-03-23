(function() {
	'use strict';

	var root = this;

	root.define([
		'views/composite/kinoListComposite'
		],
		function( Kinolistcomposite ) {

			describe('Kinolistcomposite Compositeview', function () {

				it('should be an instance of Kinolistcomposite Compositeview', function () {
					var kinoListComposite = new Kinolistcomposite();
					expect( kinoListComposite ).to.be.an.instanceof( Kinolistcomposite );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );