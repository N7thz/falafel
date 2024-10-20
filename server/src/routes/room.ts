import { Request, Response, Router } from "express"
import { randomUUID } from "node:crypto"
import { prisma } from "@/lib/prisma"

const router = Router()

interface CreateRoomRequest {
    nameRoom: string
    authorId: string
}

router.get("/rooms", async (_: Request, res: Response) => {

    const rooms = await prisma.room.findMany()

    res.send(rooms)
})

router.post("/rooms", async (
    req: Request<{}, {}, CreateRoomRequest>,
    res: Response
) => {

    const { nameRoom: name, authorId } = req.body

    const roomAlreadyExist = await prisma.room.findUnique({
        where: {
            name
        }
    })

    if (roomAlreadyExist) {

        res
            .status(400)
            .send({
                message: "Room already exists"
            })

    } else {

        const room = await prisma.room.create({
            data: {
                id: randomUUID(),
                name,
                authorId,
                createdAt: new Date(),
            }
        })

        res.status(201).send(room)
    }
})

export default router
