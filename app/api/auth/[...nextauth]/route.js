import NextAuth from "next-auth";
import prisma from "../../../libs/PrismaDB.js";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Credentialsprovider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    // Configure one or more authentication providers
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
      // ...add more providers here
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),

      Credentialsprovider({
        name: "credentials",
        credentials: {
            email: { label: "Email", type: "text", placeholder: "email" },
            password: { label: "Password", type: "password" },
            username: { label: "Username", type: "text", placeholder: "jsmith" },
        },
        async authorize(credentials, req){
            // Add logic here to look up the user from the credentials supplied
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

            return user;

        },

      })
    ],

    secret: process.env.SECRET,
    session: {
        strategy: "jwt",

    },
    bebug: process.env.NODE_ENV
  }

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
