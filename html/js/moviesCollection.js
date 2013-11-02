var MoviesCollection = Backbone.Collection.extend({
	  model: Movie,

  	  // url : 'fake-response'
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
	    	
	    	if( thisMovie )
	    	{
	    		//update it

	    		var kinos = thisMovie.get( 'cinemas' );

	    		var thisKino = movie.cinema;
		        var showTime = Date.parse( movie.date );

	    		if( kinos[ thisKino ] )
	    		{
	    			//this kino is already there!
	    			kinos[ thisKino ].push( showTime )
	    		}
	    		else
	    		{
	    			//let's add the kino and the time
	    			kinos[ thisKino ] = [ showTime ];
	    		}

	    		// console.log( kinos );

	    		
	    		thisMovie.set( 'cinemas', kinos )

	    	}
	    	else
	    	{
	    		self.add( movie, { silent: true} );
	    	}

	    } );

	    // dont return the response cos we dont want them all added
	    // now we have checked.

	    // return response;
	  },



});