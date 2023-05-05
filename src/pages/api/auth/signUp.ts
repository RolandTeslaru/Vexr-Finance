import User from "@/lib/userSchema";
import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcryptjs";
import { IUser } from "@/types";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongo";
import { getSession, signIn } from "next-auth/react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  connectToDatabase().catch((err) => res.json(err));
  if (req.method === "POST") {
    if (!req.body) return res.status(400).json({ error: "Data is missing" });
    const { email, name, password, provider } = req.body;

    console.log("PROVIDER ", provider);
    const userExists = await User.findOne({ email });

    if (userExists)
      return res.status(409).json({ error: "User Already exists" });
    else {
      try {
        const hashedPassword = await hash(password, 10);

        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          provider: "email",
        });

        const savedUser = await newUser.save();

        const user = {
          email: savedUser.email,
          name: savedUser.name,
          _id: savedUser._id,
          provider: savedUser.provider,
        };

        return res.status(201).json({
          success: true,
          user,
        });
      } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
          // mongo db will return an array, but we only want to show one error at a time
          for (let field in error.errors) {
            const msg = error.errors[field].message;
            return res.status(409).json({ error: msg });
          }
        }
        return res.status(500).json({ error: "Internal server error" });
      }
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
};

export default handler;
