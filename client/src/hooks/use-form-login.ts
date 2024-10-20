import { zodResolver } from "@hookform/resolvers/zod"
import { setCookie } from "cookies-next"
import { useForm } from "react-hook-form"

import { FormLoginType } from "@/@types/form-types"
import { useHttp } from "@/http"
import { toast } from "@/lib/toast"
import { formLoginSchema } from "@/schemas/form-login"

export function useFormLogin() {

    const http = useHttp()

    const refresh = () => window.location.reload()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormLoginType>({
        resolver: zodResolver(formLoginSchema)
    })

    function login({ email, password }: FormLoginType) {

        http.login({ email, password })
            .then(res => {

                const { data } = res

                setCookie("token", data)

                refresh()
            })
            .catch(err => {

                console.log(err)

                toast({
                    title: "Erro ao efetuar login",
                    variant: "error"
                })
            })
    }

    return {
        errors,
        register,
        handleSubmit,
        login,
    }
}
