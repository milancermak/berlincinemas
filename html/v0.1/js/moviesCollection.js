var MoviesCollection = Backbone.Collection.extend({
	  model: Movie,

  	  // url : '/berlin/cinemas',
	  initialize : function ( options )
	  {
	    _.bindAll ( this, 'initialize', 'parse' );
	  	
	  	// this.on( 'add', function(e ){
	  	// 	console.log('change');
	  	// })
	  },

	  parse: function( response )
	  {
	    var self = this;
	    _.each( response, function ( movie, i ) 
	    {
	    	var thisMovie = self.findWhere( { title: movie.title }) ;
	    	// console.log( movie.title, thisMovie );
	    	if( thisMovie )
	    	{
	    		//update it

	    		// console.log( 'its already there');

	    		var kinos = thisMovie.get( 'kinos' );

	    		var thisKino = movie.cinema;
		        var showTime = moment( Date.parse( movie.date ) );
		        // var showTime = new Date( Date.parse( movie.date ) );

	    		if( kinos[ thisKino ] )
	    		{
	    			//this kino is already there!
	    			kinos[ thisKino ].push( showTime )
	    			thisMovie.get( 'showTimes' ).push( showTime )
	    		}
	    		else
	    		{
	    			//let's add the kino and the time
	    			kinos[ thisKino ] = [ showTime ];

	    		}

	    		
	    		thisMovie.set( 'kinos', kinos )

	    	}
	    	else
	    	{
	    		// console.log( 'this wasnt there already', movie.title );
	    		self.add( movie, { silent: true} );
	    	}

	    } );

	    // dont return the response cos we dont want them all added
	    // now we have checked.

	    // return response;
	  },



});