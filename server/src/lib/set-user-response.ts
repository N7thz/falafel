import { User } from "@prisma/client"

export function setUserResponse(user: User) {

    const { id, email, userName } = user

    const userResponse = {
        id,
        email,
        userName
    }

    return userResponse
}