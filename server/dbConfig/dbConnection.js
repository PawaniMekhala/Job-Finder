import mongoose from 'mongoose';

const dbConnection = async () => {
    try{
        const dbConnection = await mongoose.connect(process.env.MONGO_URL) 

        console.log("DB Connected Successfully!");
    }
    catch(error){
        console.log("DB Eroor: " + error);
    }
}