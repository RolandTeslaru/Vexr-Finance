import { NextApiHandler } from "next";
import NextAuth, { AuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectToDatabase } from "@/lib/mongo";
const nodemailer = require('nodemailer');


const googleClient =
  "1082951994611-2i7ao582bprprb1mgila486podfs54hs.apps.googleusercontent.com";
const googleSecret = "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";

const options: AuthOptions = {
    adapter: MongoDBAdapter(connectToDatabase),
  providers: [
    GoogleProvider({
      clientId: googleClient,
      clientSecret: googleSecret,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
        }
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user: { email }, account, profile }) {
      if (
        account.provider === "google" &&
        user.email.endsWith("@example.com")
      ) {
        return true;
      }

      if (account.provider === "email" && user.email === "admin@example.com") {
        return true;
      }

      return false;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);

export default authHandler;
