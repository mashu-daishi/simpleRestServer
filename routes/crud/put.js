'use strict';

const packageFile = require( process.cwd() + '/package.json' );
const MongoClient = require( 'mongodb' ).MongoClient
const config      = require( process.cwd() + '/config' ).mongo;


module.exports = {
	route: '/resources/:type/:id',

	method: 'PUT',

	handler: ( req, res ) => {
		MongoClient.connect( config.mongoConnect, ( err, client ) => {
			if ( err ) {
				throw new Error( err );
			}

			const col = client.db( 'resources' ).collection( req.params.type );

			let query = { '_id' : req.params.id };
			let update = req.body;

			col.findOne( query, ( err, result ) => {
					if ( err ) {
						return res.status( 400 ).send( err );
					}

					if ( !result ) {
						return res.status( 403 ).send();
					}

					update.created = res.created;
					update.modified = new Date();

					col.findOneAndReplace( query, update, { 'returnNewDocument' : true }, ( reErr, finResult ) => {
						if ( reErr ) {
							return res.status( 400 ).send( reErr );
						}

						res.send( update );
					} )
				} );
		} );
	}
}
