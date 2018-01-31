const app        = require( 'express' )();
const bodyParser = require( 'body-parser' );
const glob       = require( 'glob' );
const path       = require( 'path' );
const config     = require( './config' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { 'extended': true } ) );

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



app.listen( config.express.port );
console.log( 'Express server listening on port ' + config.express.port );
