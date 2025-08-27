import mongoose from "mongoose";

const connectDB = async() => {
    try{
        mongoose.connection.on('connected', ()=> console.log
        ("Database connecteed"))
        await mongoose.connect(`${process.env.MONGODB_URL}/QuickBlog`)
    } catch(error){
        console.log(error.message);
    }
}

export default connectDB;