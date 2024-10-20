"use client"

import { FormRegisterProps } from "@/@types"
import { FormRegisterType } from "@/@types/form-types"
import { ErrorSpan } from "@/components/error-span"
import { InputPassword } from "@/components/input-password"
import { Button } from "@/components/ui/button"
import {
    Card, CardContent, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useHttp } from "@/http"
import { cn } from "@/lib/utils"
import { toast } from "@/lib/toast"
import { formRegisterSchema } from "@/schemas/form-create-user"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"

export const FormRegister = ({ setValue }: FormRegisterProps) => {

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

    function createUser({ email, password, userName }: FormRegisterType) {

        http.createUser({ email, password, userName })
            .then(() => {

                toast({
                    title: "Usuário cadastrado com sucesso.",
                    variant: "sucess"
                })

                setTimeout(() => setValue("login"), 2000)
            })
            .catch((err: AxiosError) => {

                console.log(err)

                const statusText = err.message

                toast({
                    title: statusText?.startsWith("The username")
                        ? "O userName já existe."
                        : "Erro ao cadastrar usuário.",
                    variant: "error"
                })
            })
    }

    return (
        <Card className="size-full">
            <form
                className="size-full space-y-4"
                onSubmit={handleSubmit(createUser)}
            >
                <CardHeader>
                    <CardTitle>Cadastrar</CardTitle>
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
                                placeholder="Digite seu email"
                                className={cn(
                                    errors.email && [
                                        "focus-visible:ring-destructive",
                                        "placeholder:text-destructive"
                                    ])
                                }
                                {...register("email")}
                            />
                            {
                                errors.email &&
                                <ErrorSpan message={errors.email.message} />
                            }
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <Label
                                htmlFor="email"
                                className="capitalize"
                            >
                                Nickname:
                            </Label>
                            <Input
                                id="userName"
                                autoFocus
                                placeholder="Digite seu userName"
                                className={cn(
                                    errors.userName && [
                                        "focus-visible:ring-destructive",
                                        "placeholder:text-destructive"
                                    ])
                                }
                                {...register("userName")}
                            />
                            {
                                errors.userName &&
                                <ErrorSpan message={errors.userName.message} />
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
                                    (
                                        !isNotSamePasswords &&
                                        isPasswordsExist
                                    ) && "ring ring-green-500",
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
                        <div className="w-full flex flex-col gap-3">
                            <Label
                                htmlFor="confirm_password"
                                className="capitalize"
                            >
                                confirmar senha:
                            </Label>
                            <InputPassword
                                id="confirm_password"
                                placeholder="Digite sua senha"
                                className={cn(
                                    (
                                        !isNotSamePasswords &&
                                        isPasswordsExist
                                    ) && "ring ring-green-500",
                                    errors.confirm_password && [
                                        "focus-visible:ring-destructive",
                                        "placeholder:text-destructive"
                                    ]
                                )}
                                register={register("confirm_password")}
                            />
                            {
                                errors.confirm_password &&
                                <ErrorSpan
                                    message={errors.confirm_password.message}
                                />
                            }
                        </div>
                        {
                            isNotSamePasswords &&
                            <ErrorSpan
                                message="As senhas devem ser as mesmas."
                            />
                        }
                    </div>
                </CardContent>
                <CardFooter className="w-full flex justify-end">
                    <Button
                        type="submit"
                        disabled={isNotSamePasswords}
                        className={cn(
                            " w-2/5",
                            "max-sm:w-full"
                        )}
                    >
                        Confirmar
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}