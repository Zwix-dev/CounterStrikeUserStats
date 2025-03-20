import {db} from "@/lib/db"


export function getUserByEmail(email:string) {
    try {
        const user = db.user.findUnique({where : {email}})
        return user;
    } catch {
        return null
    }
}
