import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { FormRegisterProps } from "@/@types"
import { FormRegisterType } from "@/@types/form-types"
import { useHttp } from "@/http"
import { toast } from "@/lib/toast"
import { formRegisterSchema } from "@/schemas/form-create-user"

export const UseFormRegister = ({ setValue }: FormRegisterProps) => {

    const http = useHttp()

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormRegisterType>({
        resolver: zodResolver(formRegisterSchema)
    })

    const password = watch("password")
    const confirm_password = watch("confirm_password")

    const isNotSamePasswords = password !== confirm_password
    const isPasswordsExist = password && confirm_password

    function createUser({ email, password }: FormRegisterType) {

        http.createUser({ email, password })
            .then(() => {

                toast({
                    title: "Usuário cadastrado com sucesso.",
                    variant: "sucess"
                })

                setTimeout(() => setValue("login"), 2000)
            })
            .catch(err => {

                console.log(err)

                toast({
                    title: "Erro ao cadastrar usuário.",
                    variant: "error"
                })
            })
    }

    return {
        errors,
        isNotSamePasswords,
        isPasswordsExist,
        createUser,
        register,
        handleSubmit,
    }
}
