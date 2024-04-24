import express from 'express'
import { createOrder } from '../controllers/order.controller.js';
import { authorizeRoles, isAuthenticated } from '../middleware/auth.js';


const router = express.Router();


router.route("/order/create").post(isAuthenticated,createOrder);


export default router;