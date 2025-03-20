
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/auth/verificationEmail';
import * as React from 'react';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email :string, token: string, name:string) => {
    console.log("token")

    const confirmLink = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`
    await resend.emails.send({
        from: "noreply@arthur-duval.dev", 
        to: email,
        subject: "E-mail verification email",
        react: EmailTemplate({ firstName: name, link: confirmLink }) as React.ReactElement,
    })
}
// export const sendResetPassLink = async (email: string, token: string) => {
//     const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`
   
//     await resend.emails.send({
//         from:"noreply@arthur-duval.dev", 
//         to: email,
//         subject: "Rénitialisation de votre mot de passe",
//         react: EmailTemplate({ firstName: confirmLink}),

//     })
// }