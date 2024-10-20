import { socket as Socket } from "@/lib/socket"
import { useEffect, useState } from "react"

export const useSocket = () => {

    const [socket] = useState(Socket())
    const [isConnected, setIsConnected] = useState(socket.connected)

    useEffect(() => {
        socket.on("connect", () => setIsConnected(true))
        socket.on("disconnect", () => setIsConnected(false))

        return () => {
            socket.off("connect")
            socket.off("disconnect")
        }
    }, [socket])

    return {
        socket,
        isConnected
    }
}