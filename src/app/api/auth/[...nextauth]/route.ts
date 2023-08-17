import CredentialsProvider from 'next-auth/providers/credentials';
import AuthService from '@/service/auth.service';
import NextAuth, { NextAuthOptions } from "next-auth"
import { ILogIn } from '@/types/auth/request';


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      
      async authorize(credentials, req): Promise<any> {
        try {
          const { email, password } = credentials as ILogIn

          const res = await AuthService.login({
            email,
            password
          })

          if (res.status !== 200) {
            return Promise.reject(new Error('Api Response Error Http Status: ' + res.status));
          }

          const { data } = res
          const { user, tokens } = data

          return {
            ...user,
            ...tokens
          };
        }
        catch (error: any) {
          return Promise.reject(new Error(JSON.stringify(error.response?.data)));
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      return token
    }
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
