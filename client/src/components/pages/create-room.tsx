import { 
    Card, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import ShineBorder from "@/components/ui/shine-border"
import { FormCreateRoom } from "@/components/forms/form-create-room"

export const CreateRoom = () => {
    return (
        <div className="h-dvh flex flex-col items-center justify-center">
            <ShineBorder
                className="p-1 overflow-hidden bg-background z-40"
                color={["#6366f1", "#a855f7", "#ec4899"]}
            >
                <Card className="w-[500px] z-40 space-y-4 border-none">
                    <CardHeader>
                        <CardTitle className="text-3xl">
                            Criar sala
                        </CardTitle>
                        <CardDescription>
                            Crie uma sala para chamar os amigos
                        </CardDescription>
                    </CardHeader>
                    <FormCreateRoom />
                </Card>
            </ShineBorder>
        </div>
    )
}