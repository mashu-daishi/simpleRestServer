const express = require( 'express' );
const app  = express();
const glob = require( 'glob' );
const path = require( 'path' );

const routes = glob.sync( path.join( __dirname, 'routes/**/*.js' ) );

let methods = {
	'DELETE': [],
	'GET':    [],
	'PATCH':  [],
	'POST':   [],
	'PUT':    []
};

routes.forEach( item => {
	const route = require( item );

	switch( route.method ) {
		case 'DELETE':
			app.delete( route.route, route.handler );
			break;
		case 'GET':
			app.get( route.route, route.handler );
			break;
		case 'PATCH':
			app.patch( route.route, route.handler );
			break;
		case 'POST':
			app.post( route.route, route.handler );
			break;
		case 'PUT':
			app.put( route.route, route.handler );
			break;
		default:
			console.error( `${ item } :: Incorrect method specified.` )
	};
} );

app.use( express.static( 'public' ) );

app.listen( 3000 );
