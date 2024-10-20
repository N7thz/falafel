import { Metadata } from "next"

import { FormsTab } from "@/components/forms/forms-tab"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "Gabriela Project | Login",
}

export default function Page() {
  return (
    <div className="h-dvh flex items-center justify-center">
      <FormsTab />
      <Toaster />
    </div>
  )
}