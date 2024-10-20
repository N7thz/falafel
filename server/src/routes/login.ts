import { Router, Request, Response } from "express"
import { prisma } from "@/lib/prisma"
import { setUserResponse } from "@/lib/set-user-response"
import { compare } from "bcryptjs"
import jwt from "jsonwebtoken"

const router = Router()

interface LoginRequest {
    email: string
    password: string
}

router.post("/login", async (
    req: Request<{}, {}, LoginRequest>,
    res: Response
) => {

    const { email, password } = req.body

    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {

        res
            .status(400)
            .send({
                message: "User not found."
            })

    } else {

        const isPasswordCorretly = await compare(password, user.password)

        if (!user || !isPasswordCorretly) {

            res
                .status(400)
                .send({
                    message: "Email or password incorrect."
                })

        } else {

            const KEY = process.env.JWT_KEY

            const userResponse = setUserResponse(user)

            const token = jwt.sign({ userResponse }, KEY)

            res.send({ token, user: userResponse })
        }
    }
})

export default router