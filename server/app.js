import express from 'express'
import productRoute from './routes/product.route.js'
import { errorMiddleware } from './middleware/error.js';

const app = express();


app.use(express.json());


app.use("/api/v1", productRoute);


app.use(errorMiddleware);






export default app;