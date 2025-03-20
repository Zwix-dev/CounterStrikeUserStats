// "use server"

// import { auth } from "@/lib/auth"
// import { sendVerificationEmail } from "@/lib/resend"
// import {getUserByEmail} from "@/data/user"


// export async function resendVerificationEmail(email: string) {
//   try {
    
//     const user = await getUserByEmail(email)

//     if (!user) {
//       throw new Error("User not found")
//     }

//     const token = await auth.generateToken(user.id)

//     // Send the verification email
//     await sendVerificationEmail(user.email, token, user.name)

//     return { success: true }
//   } catch (error) {
//     console.error("Failed to resend verification email:", error)
//     return { success: false, error: "Failed to send verification email" }
//   }
// }

