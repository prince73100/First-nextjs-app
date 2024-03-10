import nodemailer from 'nodemailer';
import User from '@/models/user.model';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hasedToken = await bcryptjs.hash(userId.toString(), 10)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                verifyToken: hasedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                forgotPasswordToken: hasedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c8ddc0f2370d6e",
                pass: "66f2d716d5721c"
            }
        });
        const mailOptions = {
            from:'princepjng85@gamail.com',
            to:email,
            subject:emailType === "VERIFY" ? "verify your email" : "Reset your Password",
            html:`<p>click <a href="${process.env.domain}/verifyemail?token=${hasedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" :"reset your password"}"</p>`
        }
        const mailrespose = await transport.sendMail(mailOptions);
        return mailrespose;

    } catch (error: any) {
        throw new Error(error.message)
    }
}