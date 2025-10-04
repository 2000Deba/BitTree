"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordClient() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get("token")

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [strength, setStrength] = useState("");

    // Password Strength Checker
    const checkStrength = (value) => {
        if (value.length < 6) return "Weak";
        const hasLetters = /[a-zA-Z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(value);

        if (hasLetters && hasNumbers && hasSymbols && value.length >= 8)
            return "Strong";
        if ((hasLetters && hasNumbers) || (hasLetters && hasSymbols))
            return "Medium";
        return "Weak";
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setStrength(checkStrength(value));
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match!");
            return;
        }

        setLoading(true)

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, newPassword: password }),
            })
            const data = await res.json()

            if (res.ok) {
                toast.success("Password reset successful! Redirecting to login...")
                setTimeout(() => router.push("/login"), 3000)
            } else {
                toast.error(data.error || "Invalid or expired token")
            }
        } catch {
            toast.error("Network error")
        } finally {
            setLoading(false)
        }
    }

    // Strength color classes
    const strengthColor = strength === "Strong" ? "text-green-600" : strength === "Medium" ? "text-yellow-800" : strength === "Weak" && password.length > 0 ? "text-red-600" : "text-gray-500";

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen pt-24 sm:pt-28 flex justify-center items-center bg-[#f5e8f7] px-4">
                <div className="bg-rose-200 p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Reset Password</h1>
                    <p className="text-sm text-gray-800 text-center mb-6">
                        Enter your new password below to reset your account.
                    </p>
                    <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
                        {/* New Password */}
                        <div className="relative">
                            <input type={show ? "text" : "password"} placeholder="New password" value={password} onChange={handlePasswordChange} required className="px-4 py-2 border rounded-lg focus:outline-pink-500 w-full" />
                            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-gray-500">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                        </div>

                        {/* Password Strength Indicator */}
                        {password.length > 0 && (
                            <p className={`text-sm font-medium ${strengthColor}`}>
                                Strength: {strength}
                            </p>
                        )}

                        {/* Confirm Password */}
                        <div className="relative">
                            <input type={showConfirm ? "text" : "password"} placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="px-4 py-2 border rounded-lg focus:outline-pink-500 w-full" />
                            <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-3 text-gray-500">{showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" disabled={loading} className="bg-pink-800 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition w-full disabled:opacity-70 disabled:cursor-not-allowed">{loading ? "Resetting..." : "Reset Password"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}
