import mongoose from 'mongoose'


export const connectDB = () => {

    mongoose.connect(process.env.MONGODB_URL).then((data) => {
        console.log(`MONGODB server is connected:  ${data.connection.host}`);
    }).catch((error) => {
         console.log(error);
    });
}

