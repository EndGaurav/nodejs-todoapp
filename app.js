import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleware/error.js";
import cors from "cors"
export const app = express()

config({
    path: "./data/config.env"
})

// middlewares 
// for accessing json data we use json middleware.
app.use(express.json())
app.use(cookieParser())

// using route
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true  // as we have created token for session in the form of cookie, for this we send "credentials true".
}))

app.get("/", (req, res)=>{
    res.send("Hello")
})

app.use(errorMiddleware)