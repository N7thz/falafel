import { CheckCircle, XCircle } from "lucide-react"
import { toast as toastPrimitive } from "sonner"

interface ToastProps {
    title: string
    variant: "sucess" | "error"
}

export const toast = ({ title, variant }: ToastProps) => toastPrimitive(
    title,
    {
        icon: variant === "sucess"
            ? <CheckCircle color="green" size={16} />
            : <XCircle color="red" size={16} />,
        duration: 2000,
        style: {
            fontSize: "18px",
            color: variant === "sucess" ? "green" : "red",
            border: "1px 1px 1px",
            borderColor: variant === "sucess" ? "green" : "red"
        }
    }
)