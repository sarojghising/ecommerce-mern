import app from './app.js'
import dotenv from 'dotenv'



dotenv.config({path: "server/config/.env"})


app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
