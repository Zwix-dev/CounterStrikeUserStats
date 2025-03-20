// "use client"

// import { authClient } from "@/lib/auth-client"
// import { useRouter } from "next/navigation"

// export function LogoutButton() {
//   const router = useRouter()

//   const handleLogout = async () => {
//     await authClient.signOut()
//     router.refresh()
//   }

//   return (
//     <button 
//       className="bg-purple-400 p-2 rounded-lg" 
//       onClick={handleLogout}
//     >
//       Log-out
//     </button>
//   )
// }