import { z } from "zod"

export const formCreateRoom = z.object({
    nameRoom: z
        .string()
        .min(6, { message: "O nome da sala é muito curto." })
        .max(255, { message: "O nome da sala é muito longo." })
})