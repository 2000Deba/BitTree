"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const [userHandle, setUserHandle] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const showNavbar = ["/", "/generate", "/login", "/register", "/templates","/discover", "/pricing"].includes(pathname)
  const [visible, setVisible] = useState(true)
  const [lastScroll, setLastScroll] = useState(0)

  useEffect(() => {
    let mounted = true
    async function fetchUser() {
      if (!session?.user?.email) {
        setUserHandle(null)
        return
      }
      try {
        const res = await fetch(`/api/bittree?email=${encodeURIComponent(session.user.email)}`)
        if (!res.ok) {
          setUserHandle(session.user.handle || null)
          return
        }
        const data = await res.json()
        if (mounted) setUserHandle(data?.result?.handle || session.user.handle || null)
      } catch (e) {
        setUserHandle(session.user.handle || null)
      }
    }
    fetchUser()
    return () => {
      mounted = false
    }
  }, [session])

  const handleMyBitTree = async () => {
    if (!session?.user?.email) return
    try {
      const res = await fetch(`/api/bittree?email=${encodeURIComponent(session.user.email)}`)
      const data = await res.json()
      if (data?.success && data?.result?.handle) {
        router.push(`/${data.result.handle}`)
      }
    } catch (e) {
      console.error("Failed to fetch handle:", e)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      if (currentScroll > lastScroll && currentScroll > 50) {
        // Navbar hide when scrolling down
        setVisible(false)
      } else {
        // Navbar show when scrolling up
        setVisible(true)
      }
      setLastScroll(currentScroll)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScroll])

  return (
    <>
      {showNavbar && (
        <nav className={`bg-white w-[85vw] flex justify-between items-center fixed right-[7.5vw] py-4 px-8 shadow-md z-50 transition-all duration-1000 ease-in-out ${visible ? "top-8" : "-top-28"} ${isOpen ? "rounded-t-full" : "rounded-full"}`}>
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold flex items-center gap-2 select-none">
            <span>BitTree</span>
            <img className="w-10 h-10" src="/bittree.png" alt="logo" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex gap-10 items-center text-gray-700 font-medium">
            <Link href="/templates"><li className="hover:text-pink-600 transition">Templates</li></Link>
            <Link href="/marketplace"><li className="hover:text-pink-600 transition">Marketplace</li></Link>
            <Link href="/discover"><li className="hover:text-pink-600 transition">Discover</li></Link>
            <Link href="/pricing"><li className="hover:text-pink-600 transition">Pricing</li></Link>
            <Link href="/"><li className="hover:text-pink-600 transition">Learn</li></Link>
            {status !== "loading" && session && (
              <>
                <li>
                  <Link href="/generate" className="hover:text-pink-600 transition">Generate</Link>
                </li>
                <li>
                  <button onClick={handleMyBitTree} className="bg-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition">My BitTree</button>
                </li>
              </>
            )}
          </ul>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {status === "loading" ? null : !session ? (
              <>
                <button onClick={() => signIn()} className="hidden sm:block bg-gray-400 px-4 py-2 rounded-lg font-bold hover:bg-gray-500 transition">Log in</button>
                <Link href="/register">
                  <button className="hidden sm:block bg-gray-900 text-white px-4 py-2 rounded-full font-bold hover:bg-gray-800 transition">Sign up free</button>
                </Link>
              </>
            ) : (
              <>
                <button onClick={() => signOut()} className="hidden sm:block bg-gray-400 px-4 py-2 rounded-lg font-bold hover:bg-gray-500 transition">Logout</button>
              </>
            )}

            {/* Hamburger */}
            <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition">{isOpen ? <X size={26} /> : <Menu size={26} />}</button>
          </div>

          {/* Mobile / Tablet Menu */}
          <div className={`lg:hidden absolute top-[100%] right-0 w-full bg-white rounded-b-2xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
            <ul className="flex flex-col items-center gap-6 py-6 text-lg font-medium text-gray-700">
              <Link href="/templates"><li className="hover:text-pink-600 transition">Templates</li></Link>
              <Link href="/marketplace"><li className="hover:text-pink-600 transition">Marketplace</li></Link>
              <Link href="/discover"><li className="hover:text-pink-600 transition">Discover</li></Link>
              <Link href="/pricing"><li className="hover:text-pink-600 transition">Pricing</li></Link>
              <Link href="/"><li className="hover:text-pink-600 transition">Learn</li></Link>
              {status !== "loading" && session ? (
                <>
                  <li>
                    <Link href="/generate" className="hover:text-pink-600 transition">Generate</Link>
                  </li>
                  <li>
                    <button onClick={handleMyBitTree} className="bg-gray-200 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition">My BitTree</button>
                  </li>
                  <li>
                    <button onClick={() => signOut()} className="bg-gray-400 px-4 py-2 rounded-lg font-bold hover:bg-gray-500 transition">Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button onClick={() => signIn()} className="bg-gray-400 px-4 py-2 rounded-lg font-bold hover:bg-gray-500 transition">Log in</button>
                  </li>
                  <li>
                    <Link href="/register">
                      <button className="bg-gray-900 text-white px-4 py-2 rounded-full font-bold hover:bg-gray-800 transition">Sign up free</button>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      )}
    </>
  )
}
