import mongoose from "mongoose";

export default async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log('mongoDB connected successfully');
        })
        connection.on('error', (err) => {
            console.log('mongoDB connection error');
            process.exit()
        })

    } catch (error) {
        console.log("mongoDB connection occure", error);

    }

}