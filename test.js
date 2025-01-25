const { MongoClient } = require('mongodb');

// Connection URL
const uri = "mongodb://localhost:27017";

// Database Name
const dbName = "testdb";

async function main() {
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log("Connected to MongoDB server");
        console.log('hello')
        // Access the database
        const db = client.db(dbName);

        // Access a collection
        const collection = db.collection("testCollection");

        // Insert a document
        const insertResult = await collection.insertOne({ name: "John Doe", age: 30, city: "New York" });
        console.log("Inserted document:", insertResult.insertedId);

        // Find a document
        const findResult = await collection.findOne({ name: "John Doe" });
        console.log("Found document:", findResult);

        // Update a document
        const updateResult = await collection.updateOne(
            { name: "John Doe" },
            { $set: { city: "Los Angeles" } }
        );
        console.log("Updated document:", updateResult.modifiedCount);

        // Delete a document
        const deleteResult = await collection.deleteOne({ name: "John Doe" });
        console.log("Deleted document:", deleteResult.deletedCount);

    } catch (err) {
        console.error("Error interacting with MongoDB:", err);
    } finally {
        // Close the connection
        await client.close();
        console.log("Connection closed");
    }
}

main().catch(console.error);
