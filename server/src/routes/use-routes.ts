import { Router, Request, Response } from "express"

const routerBase = Router()

routerBase.get("/teste", (req: Request, res: Response) => {
    res.send('Hello, World!')
})

export default routerBase
