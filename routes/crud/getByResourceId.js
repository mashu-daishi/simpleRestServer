'use strict';

const packageFile = require( process.cwd() + '/package.json' );
const MongoClient = require( 'mongodb' ).MongoClient
const config      = require( process.cwd() + '/config' ).mongo;


module.exports = {
	route: '/resources/:type/:id',

	method: 'GET',

	handler: ( req, res ) => {
		MongoClient.connect( config.mongoConnect, ( err, client ) => {
			if ( err ) {
				throw new Error( err );
			}

			const col = client.db( 'resources' ).collection( req.params.type );

			col.findOne( { '_id' : req.params.id }, ( err, result ) => {
				if ( err ) {
					return res.status( 400 ).send( err );
				}

				res.send( result );
			} );
		} );
	}
}
