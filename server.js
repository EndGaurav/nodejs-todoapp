import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB()
console.log(process.env.MONGO_URI)

app.listen(process.env.PORT, (req, res)=>{
    console.log(`server is working on ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})