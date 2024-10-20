"use client"

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { FormLogin } from "./form-login"
import { FormRegister } from "./form-register"

export function FormsTab() {

    const [value, setValue] = useState<"login" | "register">("login")

    return (
        <Tabs
            defaultValue={value}
            value={value}
            className={cn(
                "w-[560px] z-40",
            )}
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                    value="login"
                    onClick={() => setValue("login")}
                >
                    Login
                </TabsTrigger>
                <TabsTrigger
                    value="register"
                    onClick={() => setValue("register")}
                >
                    Cadastro
                </TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <FormLogin />
            </TabsContent>
            <TabsContent value="register">
                <FormRegister setValue={setValue} />
            </TabsContent>
        </Tabs>
    )
}