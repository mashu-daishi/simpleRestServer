'use strict';

const packageFile = require( process.cwd() + '/package.json' );

module.exports = {
	route: '/status',

	method: 'GET',

	handler: ( req, res ) => {
		let statusObj = {
			'packageName' : packageFile.name,
			'packageVersion' : packageFile.version
		}

		res.send( statusObj );
	}
}
