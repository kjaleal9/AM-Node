// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;
const { MongoClient, ObjectID, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectId();
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(
    connectionURL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
        if (error) {
            return console.log('Unable to connect to database');
        }

        const db = client.db(databaseName);

        
    }
);
