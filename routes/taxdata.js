var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('taxdb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'taxdb' database");
        db.collection('dates', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'dates' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findByStartDate = function(req, res) {
    var startDate = req.params.startdate;
    var testDate = "\"+req.params.startdate+\"";
    console.log(testDate);
    console.log('Retrieving date/s: ' + startDate);
    db.collection('dates', function(err, collection) {
        collection.find({START:"\"+req.params.startdate+\""}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('dates', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

