"use client"
import React, { useState, useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

const GenerateClient = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session, status } = useSession()

  const [links, setLinks] = useState([{ link: "", linktext: "" }])
  const [handle, setHandle] = useState("")
  const [isHandleEdited, setIsHandleEdited] = useState(false)
  const [pic, setPic] = useState("")
  const [desc, setDesc] = useState("")
  const [isLoaded, setIsLoaded] = useState(false) // prevent reset issue
  const [loading, setLoading] = useState(false) // new state for button loading
  const [selectedFile, setSelectedFile] = useState(null) // local File object
  const [previewUrl, setPreviewUrl] = useState("")       // local preview blob URL
  const [uploadingImage, setUploadingImage] = useState(false) // uploading state

  // Initial handle setup
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin")
    }

    if (status === "authenticated" && !isHandleEdited) {
      const fromUrl = searchParams.get("handle")
      const fromSession = session?.user?.handle
      setHandle(fromUrl || fromSession || "")
    }
  }, [status, router, session, searchParams, isHandleEdited])

  const handleChange = (index, link, linktext) => {
    setLinks((prev) =>
      prev.map((item, i) => (i === index ? { link, linktext } : item))
    )
  }

  const addLink = () => setLinks([...links, { link: "", linktext: "" }])

  // --------- Image selection handler ----------
  const onFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // optional: validate file type & size
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit example
      toast.error("Please choose an image smaller than 5MB")
      return
    }

    setSelectedFile(file)
    // show local preview immediately
    setPreviewUrl(URL.createObjectURL(file))

    // auto-upload selected image to server
    await uploadImage(file)
  }

  // --------- Upload image to server endpoint /api/upload ----------
  const uploadImage = async (file) => {
    try {
      setUploadingImage(true)
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      if (res.ok && data.url) {
        // set pic to cloud url — this will be used when creating bittree
        setPic(data.url)
        toast.success("Image uploaded")
      } else {
        console.error("Upload failed:", data)
        toast.error(data.error || "Upload failed")
      }
    } catch (err) {
      console.error("Upload error:", err)
      toast.error("Upload error")
    } finally {
      setUploadingImage(false)
    }
  }

  // Create or Update BitTree
  const submitLinks = async () => {
    if (!session) {
      toast.error("You must be logged in")
      return
    }

    setLoading(true) // start loading

    // sanitize handle before saving
    const cleanHandle = handle
      .trim()
      .replace(/\s+/g, "-") // space → dash
      .replace(/[^a-zA-Z0-9-_]/g, "") // remove invalid chars

    const payload = {
      email: session.user.email, // Will always be updated via email.
      links,
      handle: cleanHandle,
      pic,
      desc,
    }

    try {
      let res
      const isEditing = Boolean(searchParams.get("handle")) // There is an old handle, which means edit mode.

      if (isEditing) {
        // update existing (by email)
        res = await fetch(`/api/bittree`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      } else {
        // creating new
        res = await fetch("/api/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
      }

      const result = await res.json()
      if (res.ok && result.success) {
        toast.success(result.message)
        setTimeout(() => {
          router.push(`/${payload.handle}`)
        }, 1500)
      } else {
        toast.error(result.error || "Failed to save BitTree")
      }
    } catch (err) {
      toast.error("Network error")
    } finally {
      setLoading(false) // stop loading
    }
  }

  // Fetch existing BitTree if editing
  // Fetch existing BitTree only once (prevent reset)
  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.email && !isLoaded) {
        try {
          const res = await fetch(`/api/bittree?email=${session.user.email}`)
          if (res.ok) {
            const data = await res.json()
            if (data.success) {
              setLinks(data.result.links || [{ link: "", linktext: "" }])
              setPic(data.result.pic || "")
              setDesc(data.result.desc || "")
              setHandle(data.result.handle || "")
              setIsLoaded(true) // It will not reset from now on.
            }
          }
        } catch (err) {
          console.error("Failed to fetch BitTree:", err)
        }
      }
    }
    fetchData()
  }, [session, isLoaded])

  if (status === "loading") {
    return <p className="text-center p-10">Checking session...</p>
  }

  return (
    <>
      <ToastContainer />

      <div className="bg-[#e6c0e8] min-h-screen grid grid-cols-1 md:grid-cols-2 pt-40 px-4 md:px-0">
        {/* Left side - Form */}
        <div className="flex flex-col justify-start items-start md:items-center text-gray-900 w-full md:ml-[8vw]">
          <div className="flex flex-col gap-6 w-full max-w-lg md:my-8">
            <h1 className="font-bold text-3xl md:text-4xl text-center md:text-left">Create your BitTree</h1>

            {/* Step 1 */}
            <div className="item w-full">
              <h2 className="font-semibold text-xl md:text-2xl mb-2">Step 1: Claim your Handle</h2>
              <input
                value={handle || ""}
                onChange={(e) => {
                  const clean = e.target.value
                    .replace(/\s+/g, "-")
                    .replace(/[^a-zA-Z0-9-_]/g, "");
                  setHandle(clean);
                  setIsHandleEdited(true);
                }}
                className="bg-white px-4 py-2 w-full rounded-lg focus:outline-pink-500"
                type="text"
                placeholder="Choose a Handle"
              />
            </div>

            {/* Step 2 */}
            <div className="item w-full">
              <h2 className="font-semibold text-xl md:text-2xl mb-2">Step 2: Add Links</h2>
              {links.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-2 w-full mb-2">
                  <input value={item.linktext || ""} onChange={(e) => handleChange(index, item.link, e.target.value)} className="bg-white px-4 py-2 rounded-lg w-full sm:w-1/2 focus:outline-pink-500" type="text" placeholder="Enter link text" />
                  <input value={item.link || ""} onChange={(e) => handleChange(index, e.target.value, item.linktext)} className="bg-white px-4 py-2 rounded-lg w-full sm:w-1/2 focus:outline-pink-500" type="text" placeholder="Enter link" />
                </div>
              ))}
              <button onClick={addLink} className="bg-slate-900 text-white font-bold px-6 py-2 rounded-lg mt-2 hover:bg-slate-700 transition w-full sm:w-auto">+ Add Link</button>
            </div>

            {/* Step 3 - Picture + Description (updated) */}
            <div className="item w-full">
              <h2 className="font-semibold text-xl md:text-2xl mb-2">Step 3: Add Picture and Description</h2>
              <div className="flex flex-col gap-2">
                {/* allow both: user can paste an external image URL OR upload from device */}
                <input value={pic || ""} onChange={(e) => setPic(e.target.value)} className="bg-white px-4 py-2 rounded-lg w-full focus:outline-pink-500" type="text" placeholder="Enter link to your Picture (or upload below)" />

                {/* File input for device upload */}
                <div className="flex items-center gap-3">
                  <input id="file-upload" type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                  <label htmlFor="file-upload" className="bg-white border px-3 py-2 rounded-md cursor-pointer">{uploadingImage ? "Uploading..." : "Upload from device"}</label>

                  {/* show small status */}
                  {uploadingImage && <span className="text-sm text-gray-600">Uploading image...</span>}
                  {!uploadingImage && previewUrl && (
                    <button type="button" onClick={() => {
                      // clear selected preview & uploaded pic
                      setPreviewUrl("")
                      setSelectedFile(null)
                      setPic("")
                    }} className="text-sm text-red-600">
                      Remove
                    </button>
                  )}
                </div>

                {/* preview (either previewUrl for local file OR pic for remote url) */}
                <div className="mt-2">
                  {previewUrl ? (
                    <img src={previewUrl} alt="preview" className="w-28 h-28 object-cover rounded-md" />
                  ) : pic ? (
                    <img src={pic} alt="profile" className="w-28 h-28 object-cover rounded-md" />
                  ) : null}
                </div>

                <input value={desc || ""} onChange={(e) => setDesc(e.target.value)} className="bg-white px-4 py-2 rounded-lg w-full focus:outline-pink-500" type="text" placeholder="Enter Description" />

                {/* Updated Save/Create button: disabled when uploadingImage OR loading */}
                <button disabled={loading || uploadingImage || pic === "" || desc === "" || handle === "" || links[0].linktext === ""} onClick={submitLinks} className={`font-bold px-6 py-2 rounded-lg w-full mt-4 transition ${loading || uploadingImage || pic === "" || desc === "" || handle === "" || links[0].linktext === "" ? "bg-gray-500 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-700 text-white"}`}>{loading ? "Saving..." : searchParams.get("handle") ? "Update BitTree" : "Create your BitTree"}</button>
              </div>
            </div>

          </div>
        </div>

        {/* Right side - Image */}
        <div className="col2 w-full h-64 md:h-screen flex justify-center items-center mt-6 md:mt-10">
          <img className="h-full md:pl-24 md:pr-4 object-contain" src="/generate.png" alt="Generate your links" />
        </div>
      </div>

    </>
  )
}

export default GenerateClient
