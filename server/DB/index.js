import mongoose from "mongoose"

const connectDB = async()=>{

    try {
        let instanceOfMongoD = await mongoose.connect(process.env.DB_URL)
        // console.log("print instance " , instanceOfMongoD)
        console.log("connection Successfull")
    } catch (error) {
        console.log("Error while connecting",error.MongooseServerSelectionError)
    }
}

 


export default connectDB;