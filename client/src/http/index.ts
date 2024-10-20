import axios from "axios"
import { getCookie } from "cookies-next"

import { getAuthorization } from "./authorization"
import { login } from "./login"
import { createUser, findUserById } from "./users"
import { createRoom } from "./room"

const token = getCookie("token")

export const api = axios.create({
    baseURL: "http://localhost:3333/api",
    headers: {
        Authorization: token
    }
})

export function useHttp() {
    return {
        getAuthorization,
        login,
        createUser,
        findUserById,
        createRoom
    }
}