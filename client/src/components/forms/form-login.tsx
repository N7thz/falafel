"use client"

import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ErrorSpan } from "@/components/error-span"
import { InputPassword } from "@/components/input-password"
import { zodResolver } from "@hookform/resolvers/zod"
import { setCookie } from "cookies-next"
import { useForm } from "react-hook-form"

import { FormLoginType } from "@/@types/form-types"
import { useHttp } from "@/http"
import { toast } from "@/lib/toast"
import { formLoginSchema } from "@/schemas/form-login"
import { useRouter } from "next/navigation"

export const metadata: Metadata = {
    title: "Gabriela Project | Login"
}

export const FormLogin = () => {

    const http = useHttp()
    const { push } = useRouter()

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

                const { data: { token } } = res

                setCookie("token", token)

                push("/")
            })
            .catch(err => {

                console.log(err)

                toast({
                    title: "Erro ao efetuar login",
                    variant: "error"
                })
            })
    }

    return (
        <Card className="size-full">
            <form
                className="size-full space-y-4"
                onSubmit={handleSubmit(login)}
            >
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <div className="w-full flex flex-col gap-8">
                        <div className="w-full flex flex-col gap-3">
                            <Label
                                htmlFor="email"
                                className="capitalize"
                            >
                                email:
                            </Label>
                            <Input
                                id="email"
                                autoFocus
                                autoComplete="on"
                                placeholder="Digite seu email"
                                className={cn(
                                    errors.email && [
                                        "focus-visible:ring-destructive",
                                        "placeholder:text-destructive"
                                    ]
                                )}
                                {...register("email")}
                            />
                            {
                                errors.email &&
                                <ErrorSpan message={errors.email.message} />
                            }
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <Label
                                htmlFor="password"
                                className="capitalize"
                            >
                                senha:
                            </Label>
                            <InputPassword
                                id="password"
                                placeholder="Digite sua senha"
                                className={cn(
                                    errors.password && [
                                        "focus-visible:ring-destructive",
                                        "placeholder:text-destructive"
                                    ]
                                )}
                                register={register("password")}
                            />
                            {
                                errors.password &&
                                <ErrorSpan message={errors.password.message} />
                            }
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="w-full flex justify-end">
                    <Button
                        type="submit"
                        className="max-sm:w-full w-2/5"
                    >
                        Confirmar
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}