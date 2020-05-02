const MongoClient = require('mongodb').MongoClient;
const Constants = require('./constants').Constants;

var db;

MongoClient.connect(Constants.database_endpoint, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        console.log('An error occured while connecting MongoDB !');
        throw err;
    }
    db = client.db(Constants.database_name);
});

function getDb() {
    return db;
}

module.exports = { getDb }