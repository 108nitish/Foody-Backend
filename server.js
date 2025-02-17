import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRouter.js"
import userRouter from "./routes/userRouter.js"
import "dotenv/config.js"
import cartRouter from "./routes/cartRouter.js"
import orderRouter from "./routes/orderRouter.js"

const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())

connectDB()

app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static('uploads'));
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter);

app.get("/",(req, res)=>{
    res.send("Hello")
})

app.listen(port, ()=>{
    console.log("Sever started....")
})
