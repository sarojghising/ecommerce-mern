import app from './app.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';


// handling uncaught exception  -- caught undefined variables... 
process.on("uncaughtException", (err) => {
    console.log(`Error of Uncaught Exception: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception.`);
    server.close(() => {
        process.exit(1);
    });    
});


dotenv.config({path: "server/config/.env"})
connectDB()


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});


// unhandle  Promise Rejection : if mongodb url are misspell or wrong url then error occcur.
process.on("unhandledRejection", err => {
    console.log(`Error of Unhandled Rejection: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection.`);
    server.close(() => {
        process.exit(1);
    });
});

