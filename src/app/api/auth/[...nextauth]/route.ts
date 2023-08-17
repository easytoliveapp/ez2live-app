import CredentialsProvider from 'next-auth/providers/credentials';
import AuthService from '@/service/auth.service';
import NextAuth, { NextAuthOptions } from "next-auth"
import { ILogIn } from '@/types/auth/request';


export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
    signOut: '/logout',
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {}
      },
      
      async authorize(credentials): Promise<any> {
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

          return data.user;
        }
        catch (error) {
          return Promise.reject(new Error('Invalid email and password combination'));
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
