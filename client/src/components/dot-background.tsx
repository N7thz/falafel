import { cn } from "@/lib/utils"
import { DotPattern } from "@/components/ui/dot-pattern"
import { ComponentProps } from "react"

const DotBackground = ({ children, className }: ComponentProps<"div">) => {
    return (
        <div className={cn(
            "relative flex size-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl",
            className
        )}>
            {children}
            <DotPattern className={cn(
                "[mask-image:radial-gradient(460px_circle_at_center,white,transparent)]",
            )} />
        </div>
    )
}

export { DotBackground }
