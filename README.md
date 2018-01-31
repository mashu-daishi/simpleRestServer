
Make sure Mongo is running first.
```
	$ docker pull mongod
	$ docker run --name mongo -p 27017:27017 -d mongo --storageEngine wiredTiger
```

Change any necessary configuration for the mongodb instance in `config/index.js`
