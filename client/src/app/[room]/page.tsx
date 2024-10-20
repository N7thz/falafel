"use client"

import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSocket } from "@/hooks/use-socket"
import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from "axios"

const schema = z.object({
  input: z.string()
})

type Type = z.infer<typeof schema>

interface Message {
  text: string
  room: string
  id: string
  sendAt: Date
  isOwner?: boolean
}
export default function Home() {

  const { isConnected, socket } = useSocket()

  const [messages, setMessages] = useState<Message[]>([])

  const { room } = useParams<{ room: string }>()

  useEffect(() => {

    socket.on("message", (message) => {
      setMessages(prev => [...prev, message])
    })

    return () => { socket.off("message") }
  }, [])

  console.log(messages)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Type>({
    resolver: zodResolver(schema)
  })

  function onSubmit({ input: text }: Type) {

    const newMessage: Message = {
      text,
      room,
      id: Math.random().toString(),
      sendAt: new Date()
    }

    socket.emit("message", newMessage)

    setMessages(prev => [
      ...prev,
      { ...newMessage, isOwner: true }
    ])

    reset({ input: "" })
  }

  return (
    <main className="min-h-screen">
      <ThemeToggle />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 px-8 pt-24"
      >
        <div className="flex gap-2">
          <Input {...register("input")} />
          <Button
            type="submit"
            size={"icon"}
          >
            <Search />
          </Button>
        </div>
      </form>
      <Button
        onClick={() => {
          axios
            .get("http://localhost:3333/api/teste")
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }}
      >
        Enviar
      </Button>
      <pre className="w-full flex justify-center items-center">
        {
          JSON.stringify(messages, null, 2)
        }
      </pre>
    </main>
  )
}
