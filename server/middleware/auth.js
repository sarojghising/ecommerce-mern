import { User } from "../models/user.model.js";
import ErrorHandler from "../utils/errorhandler.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import jwt from 'jsonwebtoken';


export const isAuthenticated = catchAsyncErrors(async(req,res,next) => {

    const token = req.cookies.token;

    if (!token) return next(new ErrorHandler("Unauthorized",  401));


    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);

    next();

});


export const authorizeRoles = (...roles) => {

    return (req,res,next) => {
        if(!roles.includes(req.user.role)) {
            new ErrorHandler(`Role ${req.user.role} is not allowed to access this resource.`);
        }
        next();
    };
};



