import clientPromise from "@/lib/mongodb"

export default async function HandlePage({ params }) {
  const handle = params.handle
  const client = await clientPromise
  const db = client.db("bittree")
  const collection = db.collection("links")

  const userTree = await collection.findOne({ handle })

  if (!userTree) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold text-gray-700">
          ❌ This BitTree does not exist.
        </h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#f7f2f7] p-10">
      {/* Profile Pic */}
      {userTree.pic && (
        <img src={userTree.pic} alt={userTree.handle} className="w-28 h-28 rounded-full object-cover border-4 border-pink-400 mb-4" />
      )}

      {/* Handle */}
      <h1 className="text-3xl font-bold mb-2">@{userTree.handle}</h1>

      {/* Description */}
      {userTree.desc && (
        <p className="text-gray-700 mb-6 text-center max-w-md">
          {userTree.desc}
        </p>
      )}

      {/* Links */}
      <div className="flex flex-col gap-4 w-full max-w-md">
        {userTree.links && userTree.links.length > 0 ? (
          userTree.links.map((link, i) => (
            <a key={i} href={link.link} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-700 transition">{link.linktext || link.link}
            </a>
          ))
        ) : (
          <p className="text-gray-500">No links added yet.</p>
        )}
      </div>
    </div>
  )
}
