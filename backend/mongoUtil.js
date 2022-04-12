const MongoClient = require("mongodb").MongoClient
const urlMongo = "mongodb+srv://manuel:myrle@cluster0.1sdui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";




var db;

function connectToServer( callback ) {
    try{
        MongoClient.connect(urlMongo,  { useUnifiedTopology: true , useNewUrlParser: true }, function( err, client ) {
            db  = client.db('MYRLE');
            return callback( err );
        })

    } catch (err) {
        console.log(err)
        return err;
    }
}

function getDb() {
    return db
}

module.exports = {connectToServer, getDb,urlMongo}