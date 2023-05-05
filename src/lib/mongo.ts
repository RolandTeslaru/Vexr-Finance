// Import the `MongoClient` class from the MongoDB driver
import { MongoClient } from "mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import mongoose from "mongoose"

if(!process.env.MONGODB_URI){
    throw new Error("Please add your Mongo URI to .env.local");
}

export const connectToDatabase = async () => {
  if(process.env.MONGODB_URI)
  {
    console.log("Establishing connection to MongoDB...")
    try {
      const { connection } = await mongoose.connect(process.env.MONGODB_URI)
      if(connection.readyState === 1)
      {
        return Promise.resolve(true);
      }
    }
    catch (error) {
      return Promise.reject(error);
    }

  }
}