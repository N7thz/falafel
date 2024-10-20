import { Router, Request, Response } from "express"

const router = Router()

router.get("/teste", (req: Request, res: Response) => {
    res.send({message:'<h1>Hello, World!</h1>'})
})

export default router