define([
	'backbone'
	,'communicator'
	,'hbs!tmpl/footer'
    ,'fuse'

],
function(Backbone, Communicator, Footer_tmpl, Fuse){
    'use strict';

	return Backbone.Marionette.View.extend({
		initialize: function() {

            _.bindAll ( this
                , 'initialize'
                , 'setUpSearchMovies'
                , 'template'
                );

            this.template( Footer_tmpl );

			console.log("initialize a Footer View");

            this.$el.addClass( 'footer__infobox');

            // Communicator.mediator.on( 'MOVIES:ADDED', this.setUpSearchMovies );
		},

        events :
        {
            'click .js-searcher' : 'setUpSearchMovies',
            'click .js-results li' : 'gotoMovie'
        },

        /* ui selector cache */
        ui: {
            'results'        : '.js-results',
            'searchbox'      : '.js-searcher'
        },

		template: function ( Footer_tmpl )
		{
			var footerTmpl = Footer_tmpl;


            // return Header_tmpl;

            this.$el.append( footerTmpl({ footerHeader: "" }) );
            console.log( 'FOOTER::', this.$el );
        },

        setUpSearchMovies : function( )
        {
            var movies = Communicator.collections.movies.toJSON();
            // movies = _.omit( )
            var self = this;
            var searchbox = this.$( this.ui.searchbox );
            var resultsBox = this.$( this.ui.results );

            var searchMovies = new Fuse( movies, 
            {
                keys: ['title'],
                threshold: 0.3
            } );

            console.log( 'whatisthisss??', movies );

            // debugger;

            // this.$( this.ui.searchbox ).on( 'keypress', function( e )
            searchbox.on( 'keyup', function( e )
            {   
                resultsBox.html('');
                var query = $.trim( searchbox.val() );
                console.log( 'FOOTER:YOU TYPED', query );

                var results = searchMovies.search( query );

                // console.log( results );

                _.each( results, function( movie, i )
                {
                    if( i < 15 )
                    {
                        resultsBox.append( '<li class="searchResult" data-goto="' + movie.id + '">' + movie.title + '</li>' )
                    }
                    else if( i === 15 )
                    {
                        resultsBox.append( '<li class="searchResult--more">and so on...</li>' )   
                    }
                });

            })

            // console.log( 'FOOTER collection', movies );
            console.log( 'FOOTER SEARCH', searchMovies );

        },

        gotoMovie : function ( e )
        {
            var movie = $( e.target ).attr( 'data-goto' ) ;
            location.hash = '#' + movie;

        }
	});
});
