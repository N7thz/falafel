"use client"

import { Button } from "@/components/ui/button"
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import { Metadata } from "next"
import { Input } from "@/components/ui/input"
import { Check, Copy, RotateCcw } from "lucide-react"
import { useState } from "react"

// export const metadata: Metadata = {
//   title: "Falafel | Home",
// }

export default function Page() {

  const [hasCopied, setHasCopied] = useState(false)

  const Icon = hasCopied ? Check : Copy
  const roomCode = "fksefjsahefjkhgçdlkjskfjwsjkehj"

  async function copyRoom() {
    await navigator
      .clipboard
      .writeText(roomCode)
      .then(() => setHasCopied(true))
      .catch(err => console.log(err))

  }

  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <Card className="w-[500px] z-40 space-y-4">
        <CardHeader>
          <CardTitle className="text-3xl">
            Criar sala
          </CardTitle>
          <CardDescription>
            Crie uma sala para chamar os amigos
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-3 items-center">
          <Input
            readOnly
            value={roomCode}
            className="w-4/5"
          />
          <div className="w-1/5 flex gap-2">
            <Button
              size="icon"
              className="cursor-pointer"
              onClick={copyRoom}
            >
              <Icon />
            </Button>
            <Button
              size="icon"
              className="cursor-pointer"
            >
              <RotateCcw />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
