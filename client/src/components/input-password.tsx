import { Eye, EyeOff } from "lucide-react"
import { ComponentProps, useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

import { Input } from "@/components/ui/input"

interface InputPasswordPros extends ComponentProps<"input"> {
    register: UseFormRegisterReturn<
        "password" | "confirm_password" | "old_password"
    >
}

export const InputPassword = ({
    className, register, ...props
}: InputPasswordPros) => {

    const [isVisible, setIsVisible] = useState<boolean>(true)

    const Icon = isVisible ? Eye : EyeOff

    return (
        <div className="relative group">
            <Input
                type={isVisible ? "password" : "text"}
                className={className}
                {...props}
                {...register}
            />
            <Icon
                className="absolute top-[34%] right-2 size-4 invisible group-hover:visible cursor-pointer"
                onClick={() => setIsVisible(!isVisible)}
            />
        </div>
    )
}
