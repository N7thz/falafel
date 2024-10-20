import { Router } from "express"
import routes from "@/routes/use-routes"
import createRoom from "@/routes/room"
import createUser from "@/routes/user"
import login from "@/routes/login"

const router = Router()

router.use(createRoom)
router.use(createUser)
router.use(login)
router.use(routes)

export default router