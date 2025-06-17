import { connect } from "mongoose";

export const connectDB = async ()=> {
    try{
        await connect(process.env.MONGO_URL)
        console.log('Database connected succesfuly')
    }catch(error){
        console.log(`Error connecting to database: ${error}`)
    }
}
