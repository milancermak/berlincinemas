define([
	'backbone',
	'hbs!tmpl/item/movieItem_tmpl'
],
function( Backbone, MovieitemTmpl  ) {
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
            this.showKinoTimes();
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
                    // console.log( showTime );
                    //each shotime should be a moment.js object
                    cinemaTimes.append( '<li>' + showTime.format(" h:mm:ss a") + '</li>' )
                });

                cinemaItem.append( cinemaTimes );
                cinemaList.append( cinemaItem );
            } );

        },


        /**
         * Show KinoTimes
         * 
         * Adds Kinos to the .js-movie__cinemas list
         * @return {[type]} [description]
         */
        showKinoTimes : function ()
        {
            var self = this;
            var cinemas = this.model.get( 'cinemas' );
            var showTimeList = this.$( '.js-movie__times' );
            var showTimeArray = [];

            _.each( cinemas, function( cinema, i )
            {                
                var showTimes = cinema.show_times;

                _.each( showTimes, function( showTime, i )
                {
                    var showTimeItem = $( '<li class="cinemas__showTimes  kino--' + cinema.kino_name +
                                    '">' + showTime.format(" h:mm:ss a") + ' at ' + cinema.kino_name + '</li>');
                    var sortableTime = 
                    {
                        moment: showTime,
                        listItem: showTimeItem
                    }

                    showTimeArray.push( sortableTime );
                });

            } );

            //sort by showtime
            showTimeArray = _.sortBy( showTimeArray, function( time )
            {
                return time.moment;

            } );

            //add to the list
            _.each( showTimeArray, function( showTime )
            {
                showTimeList.append( showTime.listItem );

            } );
    
        }

	});

});
