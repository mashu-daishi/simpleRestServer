'use strict';

const packageFile = require( process.cwd() + '/package.json' );

module.exports = {
	route: '/kill',

	method: 'GET',

	handler: ( req, res ) => {
		res.send( 500 );
		
		process.exit( 1 );
	}
}
