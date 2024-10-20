import { api } from "."
import { FormCreateRoomType } from "@/@types/form-types"

interface CreateRoomRequest extends FormCreateRoomType {
    authorId: string
}

function createRoom({ nameRoom, authorId }: CreateRoomRequest) {

    const url = "/rooms"

    return api.post(url, { nameRoom, authorId })
}

export {
    createRoom
}