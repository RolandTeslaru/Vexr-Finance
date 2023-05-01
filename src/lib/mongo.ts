// Import the `MongoClient` class from the MongoDB driver
import { MongoClient } from "mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

// Define a function to connect to the database
export async function connectToDatabase(uri: string) {
  const client = new MongoClient(uri);
    console.log("Connecting to MongoDB...", client)
  try {
    // Connect to the MongoDB server
    await client.connect();

    // Return the connected client and database objects
    return { client, db: client.db() };
  } catch (err) {
    // If an error occurs, log it to the console and throw it
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
}

export default async function () {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
  }

  const { db } = await connectToDatabase(uri);

  return {
    // Configure NextAuth.js to use the MongoDB adapter
    adapter: MongoDBAdapter({
      db,
    }),

    // Add your providers here
    providers: [
      // ...
    ],

    // Add any other options here
    // ...
  };
}