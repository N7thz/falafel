import { z } from "zod"

export const formLoginSchema = z.object({
    email: z
        .string()
        .email({ message: "Email inválido." })
        .max(255, { message: "Texto do campo email muito longo." }),
    password: z
        .string()
        .min(6, { message: "Senha muito curta." })
        .max(255, { message: "Texto do campo senha muito longo." })
})