const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.URI;
// const uri = "mongodb://127.0.0.1:27017/live-chat"
console.log(uri)

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Function to connect to the database and reuse the client
async function connectDB() {
  try {
    if (!client.isConnected?.()) {
      await client.connect();
      console.log("Connected to MongoDB successfully!");
    }
    return client;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err.message);
    throw err;
  }
}

module.exports = { connectDB };
