import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { Order } from "../models/order.model.js";



const createOrder = catchAsyncErrors(async (req, res, next) => {

    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({
        shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice,
        paidAt: new Date(), 
        user: req.user._id
    });


    res.status(200).json({
        success: true, 
        message: "Order Created !!!",
        order
    });
});


export {
    createOrder
}