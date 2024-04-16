export const sendToken = (user, statusCode, res) => {

    const token = user.generateAuthToken();

    const options = {
        // maxAge: new Date(Date.now + process.env.COOKIT_EXPIREAT * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        maxAge: 3600000
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token
    });
}

