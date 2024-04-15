import express from 'express'
import productRoute from './routes/product.route.js'

const app = express();


app.use(express.json());


app.use("/api/v1", productRoute);






export default app;