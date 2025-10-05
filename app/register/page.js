"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const [strength, setStrength] = useState("")
  const router = useRouter()

  // Password strength checker
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
    const value = e.target.value
    setPassword(value)
    setStrength(checkStrength(value))
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        toast.success("Registration successful! Please login.")
        setTimeout(() => router.push("/login"), 3000)
      } else {
        toast.error(data.message || "Registration failed")
      }
    } catch (err) {
      toast.error("Network error")
    } finally {
      setLoading(false)
    }
  }

  // Dynamic color for strength text
  const getStrengthColor = () => {
    if (strength === "Weak") return "text-red-600"
    if (strength === "Medium") return "text-yellow-800"
    if (strength === "Strong") return "text-green-600"
    return "text-gray-500"
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen pt-24 sm:pt-28 flex justify-center items-center bg-[#f5e8f7] px-4">
        <div className="bg-rose-200 p-6 sm:p-10 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Create Account</h1>
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="px-4 py-2 border rounded-lg focus:outline-pink-500 w-full" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="px-4 py-2 border rounded-lg focus:outline-pink-500 w-full" />
            <div className="relative">
              <input type={show ? "text" : "password"} placeholder="Password" value={password} onChange={handlePasswordChange} required className="px-4 py-2 border rounded-lg focus:outline-pink-500 w-full" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-gray-500">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>

            {/* Password Strength Indicator */}
            {strength && (
              <div className="mt-2">
                <p className={`text-sm font-medium ${getStrengthColor()}`}>
                  Password strength: {strength}
                </p>

                <div className="h-1 w-full bg-gray-200 rounded mt-1">
                  <div className={`h-1 rounded transition-all duration-300 ${strength === "Weak" ? "bg-red-600 w-1/3" : strength === "Medium" ? "bg-yellow-800 w-2/3" : "bg-green-600 w-full"}`}></div>
                </div>
              </div>
            )}

            <button type="submit" disabled={loading} className={`py-2 rounded-lg font-semibold transition w-full text-white ${loading ? "bg-pink-500 cursor-not-allowed" : "bg-pink-800 hover:bg-pink-700"}`}>{loading ? "Registering..." : "Register"}</button>
          </form>
          <p className="text-center mt-4 text-gray-600 text-sm sm:text-base">
            Already have an account?{" "}
            <Link href={"/login"} className="text-pink-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </div>

    </>
  )
}
