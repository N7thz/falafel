import { Info } from "lucide-react"
import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

interface ErrorSpanProps extends ComponentProps<"div"> {
    message: string | undefined
    size?: number
}

export const ErrorSpan = ({ message, className, size }: ErrorSpanProps) => {
    return (
        <div className={cn(
            "w-full flex items-center text-destructive text-sm py-1",
            className
        )}>
            <Info
                size={size ?? 14}
                className="w-1/12 text-destructive"
            />
            <span className="w-11/12">
                {message}
            </span>
        </div>
    )
}
