import { api } from "."

interface CreateUserRequest {
    email: string
    password: string
    userName: string
}

function createUser({ email, password, userName }: CreateUserRequest) {

    const url = "/users"

    return api.post(url, { email, password, userName })
}

async function findUserById(id: string) {

    const url = `/users/${id}`

    const response = api.get(url)

    return (await response).data
}

export {
    createUser,
    findUserById,
}