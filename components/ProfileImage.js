"use client";
import React, { useState } from "react";

export default function ProfileImage({ pic, handle }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="flex-shrink-0">
            {!imgError && pic ? (
                <div className="p-[3px] rounded-full bg-gradient-to-tr from-rose-600 via-cyan-500 to-pink-600 shadow-md">
                    <img src={pic} alt={handle} onError={() => setImgError(true)} className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover" />
                </div>
            ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-blue-600 via-cyan-500 to-sky-600 flex items-center justify-center text-2xl sm:text-3xl font-bold text-white shadow-md">
                    {handle && handle.length > 0 ? handle.charAt(0).toUpperCase() : "?"}
                </div>
            )}
        </div>
    );
}
