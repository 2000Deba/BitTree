import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("bittree");
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        // NextAuth expects at least { id, name, email }
        return { id: user._id.toString(), name: user.name, email: user.email, handle: user.handle };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    signIn: "/login", // custom login page
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      // when user logs in (first time) user object is available
      if (user) {
        token.handle = user.handle ?? token.handle;
      }

      // if token doesn't have handle but we have email, try to load from DB
      if (!token.handle && token.email) {
        const client = await clientPromise;
        const db = client.db("bittree");
        const u = await db.collection("users").findOne({ email: token.email });
        if (u) {
          // if handle missing for social users, generate one and save
          if (!u.handle) {
            const base = (u.name || token.email.split("@")[0]).toLowerCase()
              .replace(/[^a-z0-9\-]/g, "-")
              .replace(/-+/g, "-")
              .replace(/(^-|-$)/g, "");
            let handle = base || "user";
            let i = 0;
            // ensure uniqueness
            while (await db.collection("users").findOne({ handle })) {
              i++;
              handle = `${base}${i}`;
            }
            await db.collection("users").updateOne({ _id: u._id }, { $set: { handle } });
            token.handle = handle;
          } else {
            token.handle = u.handle;
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user = session.user || {};
      session.user.handle = token.handle || null;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
