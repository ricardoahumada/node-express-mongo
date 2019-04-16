// DATABASE SETUP
let mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL || 'mongodb://localhost:27017/ddbb'; // set mongo url
let  mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
	let mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
	mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
	mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
	mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
	mongoPassword = process.env[mongoServiceName + '_PASSWORD']
	mongoUser = process.env[mongoServiceName + '_USER'];

	if (mongoHost && mongoPort && mongoDatabase) {
		mongoURLLabel = mongoURL = 'mongodb://';
		if (mongoUser && mongoPassword) {
			mongoURL += mongoUser + ':' + mongoPassword + '@';
		}
	    // Provide UI label that excludes user id and pw
	    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
	    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

	}
}

let initDb = function(callback) {
	let db = null,
	dbDetails = new Object();
	if (mongoURL == null) return;

	let mongoose   = require('mongoose');
	if (mongoose == null) return;

	const options = {useMongoClient: true};

	mongoose.connect(mongoURL,options); // connect to our database
	// Handle the connection event
	db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function() {
		dbDetails.databaseName = db.databaseName;
		dbDetails.url = mongoURLLabel;
		dbDetails.type = 'MongoDB';

		console.log('Connected to MongoDB at: %s', mongoURL);
	});
};

module.exports = {initDb};
