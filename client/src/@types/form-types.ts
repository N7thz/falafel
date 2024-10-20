import { z } from "zod"

import { formRegisterSchema } from "@/schemas/form-create-user"
import { formLoginSchema } from "@/schemas/form-login"
import { formCreateRoom } from "@/schemas/form-create-room"

export type FormLoginType = z.infer<typeof formLoginSchema>

export type FormRegisterType = z.infer<typeof formRegisterSchema>

export type FormCreateRoomType = z.infer<typeof formCreateRoom>