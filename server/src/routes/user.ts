import { Request, Response, Router } from "express"
import { randomUUID } from "node:crypto"
import { hash } from "bcryptjs"
import { prisma } from "@/lib/prisma"

const router = Router()

interface CreateUserRequest {
    email: string
    password: string
    userName: string
}

router.post("/users", async (
    req: Request<{}, {}, CreateUserRequest>,
    res: Response
) => {

    const { email, password, userName } = req.body

    console.log(email)


    const emailAlreadyExist = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            email: true
        }
    })

    const userNameAlreadyExist = await prisma.user.findUnique({
        where: {
            userName
        },
        select: {
            userName: true
        }
    })

    if (emailAlreadyExist || userNameAlreadyExist) {

        res.statusMessage = userNameAlreadyExist
            ? `The username ${userName} is already being used.`
            : "User already exists."

        res
            .status(400)
            .send({
                message: res.statusMessage
            })

    } else {

        const user = await prisma.user.create({
            data: {
                id: randomUUID(),
                email,
                userName,
                password: await hash(password, 6),
            }
        })

        res.status(201).send(user)
    }
})

export default router
