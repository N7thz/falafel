import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Metadata } from "next"
import ShineBorder from "@/components/ui/shine-border"
import { ButtonLink } from "@/components/button-link"

export const metadata: Metadata = {
  title: "Falafel | Home",
}

export default function Home() {
  return (
    <div className="h-dvh flex flex-col items-center justify-center">
      <ShineBorder
        className="p-1 overflow-hidden bg-background z-40"
        color={["#6366f1", "#a855f7", "#ec4899"]}
      >
        <Card className="space-y-6 border-none">
          <CardHeader>
            <CardTitle className="text-6xl">
              Falafel Chat
            </CardTitle>
          </CardHeader>
          <CardFooter className="gap-2 justify-center px-4">
            <ButtonLink
              href="/enter-room"
              variant="default"
            >
              Entrar em uma sala
            </ButtonLink>
            <ButtonLink
              href="/create-room"
              variant="default"
            >
              Criar uma sala
            </ButtonLink>
          </CardFooter>
        </Card>
      </ShineBorder>
    </div>
  )
}
