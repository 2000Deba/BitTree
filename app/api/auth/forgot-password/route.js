import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
    await dbConnect();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
        return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiry = resetTokenExpiry;
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
        service: "Gmail", // Email provider
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
        to: user.email,
        from: process.env.EMAIL_USER,
        subject: "BitTree Password Reset",
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. After getting this email you have to reset your password within 1 hour. After that this link will be invalid. Once you have used this link and and password resetting is completed this link will be invalid which means you are no longer albe to use this link again.</p>
        <br>
        <p>You can also click here to reset your password. <a href="${resetUrl}">Reset Password</a></p>`,
    });

    return new Response(JSON.stringify({ message: "Reset email sent" }), { status: 200 });
}
