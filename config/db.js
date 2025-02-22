import mongoose from "mongoose"

export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
        .then(()=>{
            console.log("connected to db")
        })
        .catch((err)=>{
            console.log("error:---", err)
        });
}
