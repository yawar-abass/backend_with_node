import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
});

let _db;

export async function connectToDatabase(cb) {
  try {
    const result = await client.connect();
    console.log("Connected successfully to MongoDB");
    _db = client.db("shop");
    cb();

    // You can now perform database operations using the `db` object
  } catch (err) {
    console.error("Connection to MongoDB failed", err);
  }
}

export function getDb() {
  if (_db) {
    return _db;
  }
  throw "No database found!";
}
