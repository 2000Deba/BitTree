"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleCredentialsLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (res?.error) {
      toast.error("Invalid email or password")
    } else {
      toast.success("Login successful!")
      router.push("/generate")
    }
  }

  const handleOAuthLogin = (provider) => {
    signIn(provider, { callbackUrl: "/generate" })
  }

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 pt-32">

        {/* Left side - Credentials */}
        <div className="flex flex-col justify-center items-center bg-gray-100 p-6 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center md:text-left">Login with Email</h1>
          <form onSubmit={handleCredentialsLogin} className="w-full max-w-sm flex flex-col gap-4">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="p-3 rounded-md border border-gray-300 focus:outline-pink-500 w-full" required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="p-3 rounded-md border border-gray-300 focus:outline-pink-500 w-full" required />
            <button type="submit" disabled={loading} className="bg-slate-900 text-white py-2 rounded-md font-semibold hover:bg-slate-700 transition w-full">
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Right side - OAuth */}
        <div className="flex flex-col justify-center items-center bg-[#e6c0e8] p-6 md:p-10 mt-6 md:mt-0">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Or continue with</h1>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button onClick={() => handleOAuthLogin("google")} className="bg-white border border-gray-300 p-3 rounded-md font-semibold hover:bg-gray-100 w-full">Continue with Google</button>
            <button onClick={() => handleOAuthLogin("github")} className="bg-white border border-gray-300 p-3 rounded-md font-semibold hover:bg-gray-100 w-full">Continue with GitHub</button>
          </div>
        </div>
      </div>

    </>
  )
}
