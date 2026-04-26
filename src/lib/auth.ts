import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter an email and password");
        }
        
        try {
          console.log(`[NextAuth] Authorizing user: POST /api/auth/login`);
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" }
          });

          const user = await res.json();
          console.log(`[NextAuth] Backend response:`, user);

          if (res.ok && user) {
            return user;
          }
          
          throw new Error(user.message || "Invalid credentials");
        } catch (error: any) {
          throw new Error(error.message || "Something went wrong");
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/auth/social-login`, {
            method: 'POST',
            body: JSON.stringify({
              email: user.email,
              name: user.name,
              image: user.image
            }),
            headers: { "Content-Type": "application/json" }
          });
          const data = await res.json();
          if (res.ok && data) {
            // Attach backend token to the user object temporarily so it's available in jwt callback
            (user as any).id = data.id;
            (user as any).token = data.token;
            (user as any).onboardingStatus = data.onboardingStatus;
            return true;
          }
          return false;
        } catch (error) {
          console.error("Social login error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          accessToken: (user as any).token || (token as any).accessToken,
          onboardingStatus: (user as any).onboardingStatus || (token as any).onboardingStatus,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
          onboardingStatus: token.onboardingStatus,
        },
      };
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
