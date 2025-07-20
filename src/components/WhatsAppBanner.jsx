import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa6';

const WhatsAppBanner = () => {
     const user = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();
    const [sortBy, setSortBy] = useState("posted");
    const handleWhatsapp = () => {
        if (!user) {
            dispatch(showComponent());
            return;
        }
        alert("WhatsApp group link is not available yet.");
    }
   
    return (
        <div>
            <div className="mb-1 bg-white gap-4 flex items-center justify-between rounded-md border border-gray-300 p-5 mt-0.5 max-sm:flex-col max-sm:py-2">
                <div className="flex items-center gap-2 max-sm:gap-3">
                    <FaWhatsapp className="size-20 max-sm:size-24" color="#25D366" />
                    <div>
                        <div className="text-lg font-bold max-sm:text-sm">
                            Join our WhatsApp group
                        </div>
                        <div className="text-sm w-[60%] max-sm:text-xs max-sm:w-full">
                            Join our WhatsApp group to get access to the latest jobs delivered
                            directly to your inbox everyday
                        </div>
                    </div>
                </div>
                <button
                    onClick={handleWhatsapp}
                    className="bg-green-200 max-sm:text-xs max-sm:mb-3 max-sm:w-full px-5 py-1.5 rounded-full text-sm text-green-600 border border-green-600 font-bold cursor-pointer hover:bg-green-600 hover:text-white"
                >
                    Join
                </button>
            </div>
        </div>
    )
}

export default WhatsAppBanner
