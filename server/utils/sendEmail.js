import nodemailer from 'nodemailer'


export const sendResetPasswordEmailURL = async (options) => {

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE, // 'gmail'
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: options.email,
            subject: options.subject,
            text: options.message,
        });

    } catch (error) {
        console.log(error, "email not sent");
    }


}

