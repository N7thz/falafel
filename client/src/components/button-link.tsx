import Link from "next/link"
import { ComponentProps } from "react"

import { Route } from "@/@types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ButtonLinkProps extends ComponentProps<"button"> {
    href: Route
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null
}

export const ButtonLink = ({
    href, variant = "outline", children, className, ...props
}: ButtonLinkProps) => {
    return (
        <Link
            href={href}
            className="w-full flex items-center justify-center"
        >
            <Button
                variant={variant}
                className={cn(
                    "w-full hover:scale-95 duration-200",
                    className
                )}
                {...props}
            >
                {children}
            </Button>
        </Link>
    )
}
