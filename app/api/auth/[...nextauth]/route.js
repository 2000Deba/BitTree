import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.password);
        if (!valid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          handle: user.handle,
        };
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
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();
      let existing = await User.findOne({ email: user.email });

      if (!existing) {
        existing = await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      await dbConnect();

      if (user) {
        token.id = user.id;
        token.handle = user.handle ?? token.handle;
      }

      if (token.email && !token.handle) {
        const u = await User.findOne({ email: token.email });

        if (u) {
          if (!u.handle) {
            const base = (u.name || token.email.split("@")[0])
              .toLowerCase()
              .replace(/[^a-z0-9\-]/g, "-")
              .replace(/-+/g, "-")
              .replace(/(^-|-$)/g, "");
            let handle = base || "user";
            let i = 0;
            while (await User.findOne({ handle })) {
              i++;
              handle = `${base}${i}`;
            }
            u.handle = handle;
            await u.save();
            token.handle = handle;
          } else {
            token.handle = u.handle;
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.handle = token.handle || null;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
