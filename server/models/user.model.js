import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Name cannot exceed from 30 characters."],
        minLength: [4, "Name should have more than 4 characters."]
    },
    email: {
        type: String,
        required: [true, "Please enter your email."],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email."]
    },
    password: {
        type: String,
        required: [true, "Please enter your password."],
        minlength: [8, 'Password must be at least 8 characters long'],
        maxlength: [128, 'Password must be less than 128 characters long'],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpiredAt: Date,

}, { timestamps: true });



userSchema.pre('save', async function (next) {

    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);

});


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({
        _id: this._id
    },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIREAT });

    return token;

};

userSchema.methods.getResetPasswordToken = async function () {

    const resetToken = crypto.randomBytes(32).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpiredAt = Date.now() + 15 * 60 * 1000;

    return resetToken;

}

export const User = mongoose.model("User", userSchema);