import ErrorHandler from "../utils/errorhandler.js";


export const errorMiddleware = (err,req,res,next) => {

    err.statusCode = err.statusCode || 500;

    err.message = err.message || "Internal Server Error !!";

    // wrong mongodb id error: 
    if(err.name === "CastError") {
        const message = `Resource not found. INvalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // mongodb duplidate erorr
    if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`;
        err = new ErrorHandler(message, 400);
    }

    // wrong JWT Token error 
    if(err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // jwt expire error
    if(err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }




    res.status(err.statusCode).json({
        success: false, 
        status: err.statusCode,
        message: err.message
    });

}