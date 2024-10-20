import { UserResponse } from "@/@types"

import { api } from "."

const url = "/authorization"

async function getAuthorization() {

    const response = await api.get<UserResponse>(url)

    const data = response.data

    return data
}

export {
    getAuthorization
}