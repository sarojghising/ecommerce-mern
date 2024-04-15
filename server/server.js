import app from './app.js'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js';



dotenv.config({path: "server/config/.env"})
connectDB()


app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
