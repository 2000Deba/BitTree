"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleForgotPassword = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            })
            const data = await res.json()

            if (res.ok) {
                toast.success("Reset link sent to your email!")
                setEmail("")
                // Redirect to login page with 3 second delay
                setTimeout(() => {
                    router.push("/login")
                }, 3000)
            } else {
                toast.error(data.error || "Something went wrong")
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
                <div className="bg-rose-200 p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-md">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Forgot Password</h1>
                    <p className="text-sm text-gray-800 text-center mb-6">
                        Enter your registered email. We&apos;ll send you a password reset link.
                    </p>
                    <form className="flex flex-col gap-4" onSubmit={handleForgotPassword}>
                        <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="px-4 py-2 border rounded-lg focus:outline-pink-500 w-full" />
                        <button type="submit" disabled={loading} className="bg-pink-800 text-white py-2 rounded-lg font-semibold hover:bg-pink-700 transition w-full disabled:opacity-70 disabled:cursor-not-allowed">{loading ? "Sending..." : "Send Reset Link"}</button>
                    </form>
                </div>
            </div>
        </>
    )
}
