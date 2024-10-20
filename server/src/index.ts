import express from "express"
import { createServer } from "node:http"
import { Server as Io } from "socket.io"
import cors from "cors"
import router from "./routes"

const port = 3333

const app = express()
const server = createServer(app)
const socketIo = new Io(server, {
    cors: {
        origin: "*"
    }
})

socketIo.on("connection", (socket) => {
    console.log("Novo cliente conectado")

    socket.on("disconnect", () => {
        console.log("Desconectado")
    })

    socket.on("message", (message) => {
        socket.broadcast.emit("message", message)
    })
})

app.use(cors())
app.use(express.json())
app.use("/api", router)

server.listen(port, () => {
    console.log("server is runnig")
})