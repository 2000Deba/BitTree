"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const token = searchParams.get("token")

    const [password, setPassword] = useState("")
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false)

    const handleResetPassword = async (e) => {
        e.preventDefault()
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

    return (
        <>
            <ToastContainer />
            <div className="min-h-screen pt-24 sm:pt-28 flex justify-center items-center bg-[#f5e8f7] px-4">
                <div className="bg-white p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Reset Password</h1>
                    <form className="flex flex-col gap-4" onSubmit={handleResetPassword}>
                        <div className="relative">
                            <input type={show ? "text" : "password"} placeholder="New password" value={password} onChange={(e) => setPassword(e.target.value)} required className="px-4 py-2 border rounded-lg focus:outline-pink-500 w-full" />
                            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-gray-500">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
                        </div>
                        <button type="submit" disabled={loading} className="bg-slate-900 text-white py-2 rounded-lg font-semibold hover:bg-slate-700 transition w-full">{loading ? "Resetting..." : "Reset Password"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}
