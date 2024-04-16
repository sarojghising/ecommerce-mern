import ErrorHandler from "../utils/errorhandler.js";


export const errorMiddleware = (err,req,res,next) => {

    err.statusCode = err.statusCode || 500;

    err.message = err.message || "Internal Server Error !!";

    res.status(err.statusCode).json({
        success: false, 
        status: err.statusCode,
        message: err.message
    });

}