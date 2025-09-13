"use client"
import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const Generate = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()

  const [links, setLinks] = useState([{ link: "", linktext: "" }])
  const [handle, setHandle] = useState(searchParams.get("handle") || "")
  const [pic, setPic] = useState("")
  const [desc, setDesc] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }
  }, [status, router])

  const handleChange = (index, link, linktext) => {
    setLinks((initialLinks) =>
      initialLinks.map((item, i) => (i === index ? { link, linktext } : item))
    )
  }

  const addLink = () => setLinks(links.concat([{ link: "", linktext: "" }]))

  const submitLinks = async () => {
    if (!session) {
      toast.error("You must be logged in")
      return
    }

    const payload = {
      links,
      handle,
      pic,
      desc
    }

    try {
      const res = await fetch("/api/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const result = await res.json()
      if (res.ok && result.success) {
        toast.success(result.message)
        setLinks([{ link: "", linktext: "" }])
        setPic("")
        setDesc("")
        setHandle("")
        // optional: redirect to the new bittree
        router.push(`/${payload.handle}`)
      } else {
        toast.error(result.message || "Failed to create")
      }
    } catch (err) {
      toast.error("Network error")
    }
  }

  if (status === "loading") {
    return <p className="text-center p-10">Checking session...</p>
  }

  return (
    <>
      <ToastContainer />
      <div className="bg-[#e6c0e8] min-h-screen grid grid-cols-2 pt-28">
        <div className="col1 flex justify-center items-center ml-[10vw] flex-col text-gray-900">
          <div className="flex flex-col gap-5 my-8">
            <h1 className="font-bold text-4xl">Create your BitTree</h1>

            <div className="item">
              <h2 className="font-semibold text-2xl">Step 1: Claim your Handle</h2>
              <div className="mx-4">
                <input value={handle || ""} onChange={(e) => setHandle(e.target.value)}
                  className="bg-white px-4 py-2 my-2 focus:outline-pink-500 rounded-full"
                  type="text" placeholder="Choose a Handle" />
              </div>
            </div>

            <div className="item">
              <h2 className="font-semibold text-2xl">Step 2: Add Links</h2>
              {links.map((item, index) => (
                <div key={index} className="mx-4">
                  <input value={item.linktext || ""} onChange={(e) => handleChange(index, item.link, e.target.value)}
                    className="bg-white px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full" type="text" placeholder="Enter link text" />
                  <input value={item.link || ""} onChange={(e) => handleChange(index, e.target.value, item.linktext)}
                    className="bg-white px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full" type="text" placeholder="Enter link" />
                </div>
              ))}
              <button onClick={addLink} className="p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-full cursor-pointer">+ Add Link</button>
            </div>

            <div className="item">
              <h2 className="font-semibold text-2xl">Step 3: Add Picture and Description</h2>
              <div className="mx-4 flex flex-col">
                <input value={pic || ""} onChange={(e) => setPic(e.target.value)} className="bg-white px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full" type="text" placeholder="Enter link to your Picture" />
                <input value={desc || ""} onChange={(e) => setDesc(e.target.value)} className="bg-white px-4 py-2 mx-2 my-2 focus:outline-pink-500 rounded-full" type="text" placeholder="Enter Description" />
                <button disabled={pic === "" || desc === "" || handle === "" || links[0].linktext === ""} onClick={submitLinks}
                  className="disabled:bg-gray-500 p-5 py-2 mx-2 bg-slate-900 text-white font-bold rounded-full w-fit my-5 cursor-pointer">
                  Create your BitTree
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="col2 w-full h-screen bg-[#e6c0e8]">
          <img className="h-full object-contain" src="/generate.png" alt="Generate your links" />
        </div>
      </div>
    </>
  )
}

export default Generate
