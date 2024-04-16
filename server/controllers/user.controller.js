import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { User } from '../models/user.model.js';
import ErrorHandler from '../utils/errorhandler.js';
import { sendToken } from '../utils/jwtToken.js';


const register = catchAsyncErrors(async(req,res,next) => {

    const {name,email,password} = req.body;

    let userHas = await User.findOne({ email });
    if(userHas) return next(new ErrorHandler("User already registered.",401));


    const user = await User.create({
        name,email,password,
        avatar: {
            public_id: "this is public id", 
            url: "url"
        }
    });

    sendToken(user,201, res);
    
});

const login = catchAsyncErrors(async (req,res,next) => {

    const user = await User.findOne({email : req.body.email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid User.", 401));
  
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Invalid username or password", 401));
    
    sendToken(user,200, res);
});


const logout = catchAsyncErrors(async (req,res,next) => {

    res.status(200)
    .clearCookie("token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });

});







export {
    register,
    login,
    logout
}


