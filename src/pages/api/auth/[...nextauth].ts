import { connectToDatabase } from "@/lib/mongo";
import NextAuth, { NextAuthOptions } from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import EmailProvider from "next-auth/providers/email";
import User from "../../../lib/userSchema";
import { IUser } from "@/types";
import { compare } from 'bcryptjs'
import GoogleProvider from 'next-auth/providers/google';

const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials: any) {
                await connectToDatabase().catch(err => {throw new Error(err)})

                const user = await User.findOne({
                    email: credentials?.email
                }).select("+password");

                if(!user){
                    throw new Error("Invalid credentials")
                }

                const isPasswordValid = await compare(credentials!.password, user.password);

                if(!isPasswordValid){
                    throw new Error("Invalid credentials")
                }

                return user;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_GLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    secret: process.env.NEXTAUTH_URL!,
    pages: {
        signIn: "/auth",
    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        jwt: async ({token, user}) => {
            user && (token.user = user);
            return token;
        },
        session: async ({session, token}) => {
            const user = token.user as IUser;
            session.user = user;

            return session;
        }
    }
}

export default NextAuth(options)