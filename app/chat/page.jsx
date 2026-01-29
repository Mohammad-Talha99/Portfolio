'use client'
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ChatInterface from "../components/ChatInterface";
import { assets } from "@/assets/assets";
import Image from "next/image";

export default function ChatPage() {

    return (
        <>
            <Navbar />

            {/* Background similar to Navbar but for the whole page/header area */}
            <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
                <Image src={assets.header_bg_color} className='w-full' alt='' />
            </div>

            <main className="pt-28 pb-10 min-h-screen font-Outfit">
                <div className="text-center mb-6">
                    <h1 className="text-3xl md:text-4xl font-Ovo font-bold mb-2">Chat with AI</h1>
                    <p className="text-gray-600 dark:text-gray-300">Ask any question about my portfolio, skills, or experience.</p>
                </div>
                <ChatInterface />
            </main>
        </>
    );
}
