"use client"

import { FormCreateRoomType } from "@/@types/form-types"
import { Button } from "@/components/ui/button"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formCreateRoom } from "@/schemas/form-create-room"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { ErrorSpan } from "@/components/error-span"
import { useHttp } from "@/http"

export const FormCreateRoom = () => {

    const http = useHttp()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormCreateRoomType>({
        resolver: zodResolver(formCreateRoom)
    })

    function onSubmit({ nameRoom }: FormCreateRoomType) {
        console.log(nameRoom)

        http
            .createRoom({ nameRoom, authorId: "2312" })
            .then((res) => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col gap-3 items-center">
                <Label className="w-full flex flex-col gap-3">
                    Nome da sala:
                    <Input
                        placeholder="Digite o nome da sala..."
                        {...register("nameRoom")}
                    />
                </Label>
                {
                    errors.nameRoom &&
                    <ErrorSpan message={errors.nameRoom.message} />
                }
            </CardContent>
            <CardFooter className="justify-end">
                <Button
                    type="submit"
                    className="w-1/2"
                >
                    Criar sala
                </Button>
            </CardFooter>
        </form>
    )
}
