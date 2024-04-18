import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { User } from '../models/user.model.js';
import ErrorHandler from '../utils/errorhandler.js';
import { sendToken } from '../utils/jwtToken.js';
import { sendResetPasswordEmailURL } from '../utils/sendEmail.js';


const register = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password } = req.body;

    let userHas = await User.findOne({ email });
    if (userHas) return next(new ErrorHandler("User already registered.", 401));


    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "this is public id",
            url: "url"
        }
    });

    sendToken(user, 201, res);

});

const login = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email }).select("+password");
    if (!user) return next(new ErrorHandler("Invalid User.", 401));

    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Invalid username or password", 401));

    sendToken(user, 200, res);
});


const logout = catchAsyncErrors(async (req, res, next) => {

    res.status(200)
        .clearCookie("token")
        .status(200)
        .json({ message: "Successfully logged out." });

});

const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) return next(new ErrorHandler("User not found.", 404));

    const resetToken = await user.getResetPasswordToken();


    await user.save({ validateBeforeSave: false });


    const resetPasswordURL = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;



    const message = `Your password reset token is: - \n\n ${resetPasswordURL} \n\n If you have not requested this email then please ignore it.`


    try {
        await sendResetPasswordEmailURL({
            email: user.email, 
            subject: `Ecommerce | Password Recovery`,
            message

        });

        res.status(200).json({
            success: true, 
            message: `Email sent to ${user.email} Sucessfully.`
        })
    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpiredAt = undefined;
        await user.save({validateBeforeSave: false});


        return next(new ErrorHandler(error.message, 500));
        
    }





})







export {
    register,
    login,
    logout,
    forgotPassword
}


