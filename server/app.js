import express from 'express'
import productRoute from './routes/product.route.js'
import userRoute from './routes/user.route.js'
import orderRoute from './routes/order.route.js'
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.js';

const app = express();


app.use(express.urlencoded({extended: 'false'}))
app.use(express.json());
app.use(cookieParser());


app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);


app.use(errorMiddleware);






export default app;