'use strict';

module.exports = ( () => {
	let config = {
		'express' : {
			'port' : 3000
		},

		'mongo' : {
			'host':       'localhost',
			'port':       27017,
			'collection': 'default'
		}
	};

	config.mongo.mongoConnect = `mongodb://${ config.mongo.host }:${ config.mongo.port }/${ config.mongo.collection }`;

	return config;
} )();
