import dbConnect from "@/lib/mongoose";
import BitTree from "@/models/BitTree";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileImage from "@/components/ProfileImage";

export async function generateMetadata({ params }) {
  await dbConnect();
  const handle = (await params).handle;

  // First, find the BitTree by handle.
  const bit = await BitTree.findOne({ handle }).lean();
  if (!bit) return { title: "BitTree not found" };

  return {
    title: `${bit.handle} • BitTree`,
    description: bit.desc || `Links by ${bit.handle}`,
  };
}

export default async function Page({ params }) {
  await dbConnect();
  const handle = (await params).handle;
  if (!handle) return notFound();

  // First, find the BitTree by handle.
  const bit = await BitTree.findOne({ handle }).lean();
  if (!bit) return notFound();

  // Remove user from session
  const session = await getServerSession(authOptions);
  const visitorId =
    session?.user?.id ?? session?.user?.sub ?? session?.user?.email;

  // owner check: user's email == ownerEmail (in links collection) or visitorId == ownerId
  const isOwner =
    !!(session && (session.user.email === bit.ownerEmail || visitorId === bit.ownerId));

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ab289e] via-[#188c90] to-[#b75d18] p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/20">

        {/* Profile Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          <ProfileImage pic={bit.pic} handle={bit.handle} />

          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{bit.handle}</h1>
            {bit.desc && <p className="text-sm sm:text-base text-gray-700 mt-1">{bit.desc}</p>}
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Created: {new Date(bit.createdAt).toLocaleString()}
            </p>
            {isOwner && (
              <a href={`/generate?handle=${bit.handle}`} className="inline-block mt-2 px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm sm:text-base font-semibold rounded-full shadow-md hover:from-pink-500 hover:to-purple-500 transition-all">Edit BitTree</a>
            )}
          </div>
        </div>

        {/* Links Section */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 gap-4">
          {bit.links && bit.links.length ? (
            bit.links.map((l, i) => (
              <a key={i} href={l.link} target="_blank" rel="noopener noreferrer" className="block p-4 sm:p-5 border border-white/30 rounded-xl bg-white/60 backdrop-blur-md hover:shadow-lg hover:bg-white/80 transition-all duration-300">
                <div className="font-semibold text-gray-800">{l.linktext || l.link}</div>
                <div className="text-sm sm:text-base text-gray-600 truncate">{l.link}</div>
              </a>
            ))
          ) : (
            <p className="text-gray-700 text-center sm:text-left mt-4">No links added yet.</p>
          )}
        </div>
      </div>
    </main>

  );
}
