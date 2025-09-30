import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    await dbConnect();
    const { token, newPassword } = await req.json();

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiry: { $gt: new Date() }, // compare with Date
    });

    if (!user) {
        return new Response(JSON.stringify({ error: "Invalid or expired token" }), { status: 400 });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiry = undefined;

    await user.save();
    
    return new Response(JSON.stringify({ message: "Password reset successful" }), { status: 200 });
}
