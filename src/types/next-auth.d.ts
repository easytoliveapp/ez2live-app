import { IUser } from '@/types/auth/response'
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
	interface Session extends IUser {
		user: IUser
	}

	interface User extends IUser { }
}

declare module "next-auth/jwt" {
	interface JWT extends IUser { }
} 