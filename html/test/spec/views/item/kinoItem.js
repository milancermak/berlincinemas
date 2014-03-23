(function() {
	'use strict';

	var root = this;

	root.define([
		'views/item/kinoItem'
		],
		function( Kinoitem ) {

			describe('Kinoitem Itemview', function () {

				it('should be an instance of Kinoitem Itemview', function () {
					var kinoItem = new Kinoitem();
					expect( kinoItem ).to.be.an.instanceof( Kinoitem );
				});

				it('should have more test written', function(){
					expect( false ).to.be.ok;
				});
			});

		});

}).call( this );