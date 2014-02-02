define([
	'backbone',
	'hbs!tmpl/header'
],
function(Backbone, Header_tmpl ){
    'use strict';

	return Backbone.View.extend({
		initialize: function() {
			console.log("initialize a Header View");

			// console.log( this );
			this.template( Header_tmpl );
		},

    	serializeData: function() {
	    viewData = { "headerText": "foo" };
	    console.log( 'seriasss' );
	    return viewData;
	  },

		template: function ( Header_tmpl )
		{
			var headerTmpl = Header_tmpl;
			console.log( 'TEMPALTINGGNGNGNG' );

			// return Header_tmpl;

			this.$el.append( headerTmpl({ headerText: "BLABLA!" }) );

		}
	});
});
