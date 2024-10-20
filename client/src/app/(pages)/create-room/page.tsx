import { Metadata } from "next"
import { CreateRoom } from "@/components/pages/create-room"

export const metadata: Metadata = {
  title: "Falafel | Criação de sala",
}

export default function Page() {
  return (
    <CreateRoom />
  )
}
