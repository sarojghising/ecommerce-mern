import { catchAsyncErrors } from '../middleware/catchAsyncErrors.js';
import { User } from '../models/user.model.js';
import ErrorHandler from '../utils/errorhandler.js';
import { sendToken } from '../utils/jwtToken.js';
import { sendResetPasswordEmailURL } from '../utils/sendEmail.js';
import crypto from 'crypto'


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
        });

    } catch (error) {

        user.resetPasswordToken = undefined;
        user.resetPasswordExpiredAt = undefined;
        await user.save({ validateBeforeSave: false });


        return next(new ErrorHandler(error.message, 500));

    }





});


const resetPassword = catchAsyncErrors(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpiredAt: { $gt: Date.now() }
    });

    if (!user) return next(new ErrorHandler("reset password token is invalid or has been expired.", 401));

    if (req.body.password !== req.body.confirmPassword) return next(new ErrorHandler("new password and confirm password should matched.", 401));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiredAt = undefined;

    await user.save({ validateBeforeSave: false });

    sendToken(user, 200, res);

    res.status(200).json({
        success: true,
        message: "Password Changed Successfully.",
        user
    });

});


const getUserDetails = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    });

});


const updatePassword = catchAsyncErrors(async (req, res, next) => {

    const user = await User.findById(req.user.id).select("+password");

    const isMatch = await user.comparePassword(req.body.oldPassword);

    if (!isMatch) return next(new ErrorHandler("old password is invalid", 401));

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("password does not matched", 401));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res);


});

const updateProfile = catchAsyncErrors(async (req, res, next) => {

    const newData = { name: req.body.name, email: req.body.email };

    // we will add cloudinary later 

    const user = await User.findByIdAndUpdate(req.user.id, newData, { new: true, runValidators: true, useFindAndModify: false });


    res.status(200).json({
        success: true,
        message: "Update Profile Successfully.",
        user
    });

});



// get All Users -- admin
const getAllUsers = catchAsyncErrors(async(req,res,next) => {

    const users = await User.find();

    res.status(200).json({
        success: true, 
        users
    });
});

//get single user from all users -- admin
const fetchSingleUser = catchAsyncErrors(async(req,res,next) => {

    const user = await User.findById(req.params.id);

    if(!user) return next(new ErrorHandler(`User does not exist with id: ${req.params.id}`,404));

    res.status(200).json({
        success: true, 
        user
    });
});



















export {
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUsers,
    fetchSingleUser
}


