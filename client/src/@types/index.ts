import { Dispatch, SetStateAction } from "react"

export type Route = "/create-room" | "/enter-room"

export interface FormRegisterProps {
    setValue: Dispatch<SetStateAction<"login" | "register">>
}