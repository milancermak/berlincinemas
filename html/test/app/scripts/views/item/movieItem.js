define([
	'backbone',
	'hbs!tmpl/item/movieItem_tmpl',
    'moment'
],
function( Backbone, MovieitemTmpl, Moment  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			console.log("initialize a Movieitem ItemView");

            // console.log( this.model.kinos );
		},
		
    	template: MovieitemTmpl,

        className: "movie-box",
        
    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function() {

            this.showKinos();
        },

        /**
         * Show Kinos
         * 
         * Adds Kinos to the .js-movie__cinemas list
         * @return {[type]} [description]
         */
        showKinos : function ()
        {
            // console.log( 'showing kinos' );
            var cinemas = this.model.get( 'cinemas' );
            var cinemaList = this.$( '.js-movie__cinemas' );
            var self = this;

            _.each( cinemas, function( cinema, i )
            {
                var cinemaItem = $( '<li class="cinemas__cinema  kino--' + cinema.kino_name +
                                    '">' + cinema.kino_name + '</li>');

                var cinemaTimes = $( '<ol class="cinema__times"></ol>' );
                
                var showTimes = cinema.show_times;

                _.each( showTimes, function( showTime, i )
                {
                    console.log( showTime );
                    //each shotime should be a moment.js object
                    cinemaTimes.append( '<li>' + showTime.format(" h:mm:ss a") + '</li>' )
                });

                cinemaItem.append( cinemaTimes );
                cinemaList.append( cinemaItem );
            } );

        },


        // /**
        //  * Show KinoTimes
        //  * 
        //  * Adds Kinos to the .js-movie__cinemas list
        //  * @return {[type]} [description]
        //  */
        // showKinoTimes : function ()
        // {
        //     // console.log( 'showing kinos' );
        //     var cinemas = this.model.get( 'cinemas' );
        //     var cinemaList = this.$( '.js-movie__cinemas' );
        //     var self = this;

        //     _.each( cinemas, function( cinema, i )
        //     {
        //         cinemaList.append( '<li class="cinema">' + cinema.kino_name + '</li>');
        //     } );

        // }

	});

});
