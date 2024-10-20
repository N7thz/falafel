import { z } from "zod"

export const formRegisterSchema = z.object({
    email: z
        .string()
        .email({ message: "Email inválido." })
        .max(255, { message: "Texto do campo email muito longo." }),
    userName: z
        .string()
        .min(6, { message: "O nickName deve ter no minimo 6 caracteres." })
        .max(255, { message: "Texto do campo email muito longo." }),
    password: z
        .string()
        .min(6, { message: "Senha muito curta." })
        .max(255, { message: "Texto do campo senha muito longo." })
        .regex(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).+$/,
            "Use uma combinação de letras,números e simbolos."
        ),
    confirm_password: z
        .string()
        .min(6, { message: "Senha muito curta." })
        .max(255, { message: "Texto do campo comfirmar senha muito longo." }),
})