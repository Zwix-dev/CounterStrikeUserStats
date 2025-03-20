import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { sendVerificationEmail } from "./resend";
 
const prisma = new PrismaClient();
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {  
        enabled: true,
        requireEmailVerification:true,
        autoSignIn: true,
    },
    socialProviders: { 
       github: { 
        clientId: process.env.GITHUB_CLIENT_ID as string, 
        clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
       } 
    }, 
    emailVerification: {
        sendVerificationEmail: async ({ user, token }) => {
			await sendVerificationEmail(user.email, token, user.name);
		},
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        expiresIn: 3600
    },
});