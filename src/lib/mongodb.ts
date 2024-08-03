import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

// In development mode, use a global variable to cache the MongoClient instance
if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, create a new client for each request
  clientPromise = client.connect();
}

export default clientPromise;
