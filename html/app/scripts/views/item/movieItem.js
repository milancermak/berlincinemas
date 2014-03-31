define([
	'backbone',
	'hbs!tmpl/item/movieItem_tmpl'
],
function( Backbone, MovieitemTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function() {
			_.bindAll( this, 'initialize', 'showKinoDetails' );
			console.log("initialize a Movieitem ItemView");

            // console.log( this.model.kinos );

			this.listenTo( this.model, 'hasYouTube', this.showKinoDetails )
		},

    	template: MovieitemTmpl,

        className: "movie-box",

    	/* ui selector cache */
    	ui: {},

		/* Ui events hash */
		events: {},

		/* on render callback */
		onRender: function()
		{
            this.showKinos();
            this.showKinoTimes();


            // this.showKinoDetails();
	    },


		showKinoDetails : function ( )
		{

			var self = this;

		// console.log();
			// console.log( self.$el.( '.js-movie__thumbnail' ) );
			// console.log( self.model.toJSON() );

			this.$( '.js-movie__thumbnail' ).prop( 'src', self.model.get( 'thumbnail' ) );
			this.$( '.js-movie__link' ).prop( 'href', self.model.get( 'link' ) );
			this.$( '.js-movie__description' ).text( self.model.get( 'description' ) );

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
									'"><span class="cinemas__cinema__name">' + cinema.kino_name + '</span></li>');

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
