import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AuthService from "@/service/auth.service";
import NextAuth, { NextAuthOptions } from "next-auth";
import dayjs from "dayjs";

import { ILogIn } from "@/types/auth/request";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials): Promise<any> {
        try {
          const { email, password } = credentials as ILogIn;

          const res = await AuthService.login({
            email,
            password,
          });

          if (res.status !== 200) {
            return Promise.reject(
              new Error("Api Response Error Http Status: " + res.status),
            );
          }

          const { data } = res;
          const { user, tokens } = data;

          return {
            user,
            tokens,
          };
        } catch (error: any) {
          return Promise.reject(
            new Error(JSON.stringify(error.response?.data)),
          );
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      if (trigger === "update") {
        token.user = session.user;
      }

      if (account && account?.provider !== "credentials") {
        const authSocialRes = await AuthService.loginSocial({
          user: { name: user?.name, email: user?.email },
          socialId: account?.providerAccountId,
          socialProvider: account?.provider,
        });

        if (authSocialRes.status !== 200) {
          return Promise.reject(
            new Error(
              "Api Response Error Http Status: " + authSocialRes.status,
            ),
          );
        }

        const { data } = authSocialRes;
        const { user: userData, tokens } = data;

        if (!data?.user) {
          return Promise.reject(new Error("No user found"));
        }

        token = {
          user: userData,
          tokens,
        };
      } else {
        token = {
          ...token,
          ...user,
        };
      }

      if (!user && token) {
        // This happens when user has logged but we need refresh token
        if (dayjs().isAfter(dayjs(token.tokens.refresh.expires))) {
          const refreshRes = await AuthService.refreshToken({
            refreshToken: token.tokens.refresh.token,
          });

          if (refreshRes.status !== 200) {
            return Promise.reject(
              new Error("Api Response Error Http Status: " + refreshRes.status),
            );
          }

          const { data } = refreshRes;
          const { tokens } = data as any;

          token = {
            ...token,
            tokens,
          };
        }
      }

      return token;
    },

    async session({ session, token }) {
      session = {
        ...token,
        expires: session.expires,
      };

      return Promise.resolve(session);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
