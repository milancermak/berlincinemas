define([
	'backbone',
	'communicator',
	'hbs!tmpl/item/movieItem_tmpl'
],
function(
	Backbone
	,Communicator
	,MovieitemTmpl  ) {
    'use strict';

	/* Return a ItemView class definition */
	return Backbone.Marionette.ItemView.extend({

		initialize: function()
		{
			_.bindAll(
				this,
				'initialize'
				, 'onRender'
				, 'updateSavedMovies'
				, 'showKinoDetails'
				, 'showMovie'
				, 'hideIfNotOv' );
			// console.log("initialize a Movieitem ItemView");

            // console.log( this.model.kinos );

			// this.listenTo( this.model, 'hasYouTube', this.showKinoDetails );
			this.listenTo( this.model, 'change:saved', this.updateSavedStyles );


			Communicator.mediator.on( 'MOVIES:SHOW_ALL', this.showMovie );
			Communicator.mediator.on( 'MOVIES:SHOW_ONLY_OV', this.hideIfNotOv );

		},

    	template: MovieitemTmpl,

        className: "movie-box",

    	/* ui selector cache */
    	ui: {
			'showtimeButton'		: '.js-showtimes__button',
			'saveButton'			: '.js-saved-movie'
		},

		/* Ui events hash */
		events: {
			// 'click ui.showtimeButton' : 'clickShowtimeButton',
			// 'click @ui.saveButton'	: 'updateSavedMovies'
			'click .js-saved-movie'	: 'updateSavedMovies',
		},

		/* on render callback */
		onRender: function()
		{
            this.showKinos();
            this.showKinoTimes();
			this.updateSavedStyles();

			if( ! this.model.get( 'original') )
			{
				// console.log( this.$el );
				this.$el.addClass( 'hidden' );
			}

			// we're showing omu only first
			if( this.model.get( 'original') )
			{
				this.showKinoDetails();

			}
            // this.showKinoDetails();
	    },


		/**
		* Update Saved Movies
		* e { object } 	event object
		**/
		updateSavedMovies: function ( e )
		{
			e.preventDefault();
			var title = this.model.get( 'title' );

			// $.cookie.json = true;

			// console.log( 'COOKIE OBJECT', $.cookie );

			var cookie = Communicator.cookie;

		// console.log( 'saved movies from movie iten', cookie.savedMovies );


			if( this.model.get( 'saved' ) ) // we're unsaving
			{
				// this.$el.removeClass( 'saved' );

				//adding classes and text should be set independently of this, so to be reused upon rendering
				// add a saved class to the model upon colleciton init??

				this.model.set(  'saved',  false  );

				delete cookie.savedMovies[ title ];
			}
			else
			{
				// this.$el.addClass( 'saved' );
				cookie.savedMovies[ title ] = true;

				this.model.set( 'saved', true );
				//were saving

			}

			// console.log( 'is this saved', this.model.get( 'saved' ) );

			// console.log( 'SAVED MOVIE THING', e );
			//save the cookie in the end
			$.cookie( 'kinos', cookie );

		},



		updateSavedStyles : function ( )
		{
			// console.log( 'UPDATING STYLES FOR', this.model.get( 'title' ) );


			if( this.model.get( 'saved' ) )
			{
				//saved styles
				this.$el.addClass( 'saved js-saved' );
				this.ui.saveButton.text( 'Remove from saved movies' );

			}
			else
			{
				this.$el.removeClass( 'saved js-saved' );
				this.ui.saveButton.text( 'Save this for later!' );
			}

		},




		showMovie :function (  )
		{
			console.log( 'showing tha movie' );
			this.$el.removeClass( 'hidden' );
		},



		hideIfNotOv :function (  )
		{
			if( this.model.get( 'original' ) )
			{
				return;
			}
			else
			{
				this.$el.addClass( 'hidden' );

			}
			console.log( 'hiding tha movie' );
		},


		showKinoDetails : function ( )
		{

			var self = this;

			// console.log( 'SHOWING DETAILS OF::', this.model.toJSON() );

			this.$( '.js-movie__thumbnail' ).prop( 'src', self.model.get( 'thumbnail' ) );
			this.$( '.js-movie__link' ).prop( 'href', self.model.get( 'link' ) );
			// this.$( '.js-movie__description' ).text( self.model.get( 'description' ) );

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
									'">' + showTime.format(" h:mm:ss a") + ' at <span class="cinemas__cinema__name">' + cinema.kino_name + '</span></li>');
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

		},

		clickShowtimeButton : function ( e )
		{
			console.log( 'you clicked a showtime button' );
			e.preventDefault();
		}

	});

});
