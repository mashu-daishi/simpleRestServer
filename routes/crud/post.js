'use strict';

const uuidV4      = require( 'uuid/v4' );
const packageFile = require( process.cwd() + '/package.json' );
const MongoClient = require( 'mongodb' ).MongoClient
const config      = require( process.cwd() + '/config' ).mongo;

module.exports = {
	route: '/resources/:type',

	method: 'POST',

	handler: ( req, res ) => {
		MongoClient.connect( config.mongoConnect, ( err, client ) => {
			if ( err ) {
				throw new Error( err );
			}

			const col = client.db( 'resources' ).collection( req.params.type );

			req.body.created = new Date();
			req.body._id = uuidV4();

			col.insert( req.body, ( err, body ) => {
				if ( err ) {
					return res.status( 400 ).send();
				}

				res.status( 204 ).send();
			} );
		} );
	}
}
