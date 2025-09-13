"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
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
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen pt-28 flex justify-center items-center bg-[#f5e8f7]">
        <div className="bg-white p-10 rounded-xl shadow-lg w-[400px]">
          <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>
          <form className="flex flex-col gap-4" onSubmit={handleRegister}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="px-4 py-2 border rounded-lg focus:outline-pink-500" />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="px-4 py-2 border rounded-lg focus:outline-pink-500" />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="px-4 py-2 border rounded-lg focus:outline-pink-500" />

            <button type="submit" className="bg-slate-900 text-white py-2 rounded-lg font-semibold hover:bg-slate-700 transition">Register</button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-pink-600 font-semibold">
              Login
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
