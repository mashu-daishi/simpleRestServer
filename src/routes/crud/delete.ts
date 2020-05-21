'use strict';

import mongodb = require( 'mongodb' );

const MongoClient = mongodb.MongoClient;

const config      = require( process.cwd() + '/config' ).mongo;

module.exports = {
	route: '/resources/:type/:id',

	method: 'DELETE',

	handler: ( req, res ) => {
		MongoClient.connect( config.mongoConnect, ( err, client ) => {
			if ( err ) {
				throw new Error( err );
			}

			const col = client.db( 'resources' ).collection( req.params.type );

			let query = { '_id' : req.params.id };

			col.findOneAndDelete( query, ( err, result ) => {
					if ( err ) {
						return res.status( 400 ).send( err );
					}

					res.status( 204 ).send();
				} );
		} );
	}
}
