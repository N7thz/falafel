import { Request, Response, Router } from "express"
import { randomUUID } from "crypto"
import { prisma } from "@/lib/prisma"

const router = Router()

interface CreateRoomRequest {
    name: string
}

router.post("/create-room", async (
    req: Request<{}, {}, CreateRoomRequest>,
    res: Response
) => {
    const { name } = req.body
    console.log(name)

    const roomAlreadyExist = await prisma.room.findUnique({
        where: {
            name
        }
    })

    if (roomAlreadyExist) {

        res.status(400).send({
            message: "Room already exists"
        })

    } else {

        const room = await prisma.room.create({
            data: {
                id: randomUUID(),
                name,
                authorId: "",
                createdAt: new Date(),
            }
        })

        res.status(201).send(room)
    }
})

export default router
