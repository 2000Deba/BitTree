import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import crypto from "crypto";
import nodemailer from "nodemailer";

export async function POST(req) {
    try {
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
            from: `"BitTree Support" <${process.env.EMAIL_USER}>`,
            subject: "BitTree Password Reset",
            html: `
                <p>Hello,</p>
                <p>You have requested to reset your password. Click the link below to reset it:</p>
                <p><a href="${resetUrl}" target="_blank">Reset Password</a></p>
                <p><strong>Note:</strong> This link is valid for only 1 hour and can be used once. After that it will expire.</p>
                <br/>
                <p>If you did not request this, please ignore this email.</p>
            `,
        });

        return new Response(JSON.stringify({ message: "Reset email sent" }), { status: 200 });
    } catch (error) {
        console.error("Error sending email:", error);
        return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
    }
}
