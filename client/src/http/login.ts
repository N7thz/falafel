import { AxiosResponse } from "axios"

import { FormLoginType as LoginRequest } from "@/@types/form-types"

import { api } from "."

const url = "/login"

type UserResponse = {
    id: string
    email: string
    userName: string
}

interface LoginResponse {
    token: string
    user: UserResponse
}

function login({
    email, password
}: LoginRequest): Promise<AxiosResponse<LoginResponse>> {
    return api.post(url, { email, password })
}

export {
    login
}