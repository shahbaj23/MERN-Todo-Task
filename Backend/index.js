import express from "express";
import dotenv from "dotenv"
import cors from 'cors'
import connectToMongo from "./db.js";
import authRoute from "./routes/authRoute.js";
import todoRouter from "./routes/todoRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT;


connectToMongo()
app.use(cors())
app.use(express.json())
app.use("/user", authRoute)
app.use("/todo", todoRouter)


app.listen(port, ()=>{
    console.log("Server connecting successfully")
})