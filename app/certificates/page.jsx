'use client'
import { certificateData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from "motion/react"

const Certificates = () => {
    return (
        <div className='w-full px-[12%] py-10 pt-28 scroll-mt-20'>
            <motion.h2
                initial={{ y: -20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className='text-center text-5xl font-Ovo mb-12'
            >My Certificates</motion.h2>

            <div className='grid grid-cols-auto gap-8 my-10'>
                {certificateData.map((item, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className='border border-gray-400 rounded-lg p-5 cursor-pointer hover:shadow-lg dark:hover:shadow-white/20'
                    >
                        <div className='flex flex-col items-center gap-4'>
                            <Image src={item.image} alt={item.title} className='w-24 rounded-full border bg-gray-100 p-2' />
                            <h3 className='text-xl font-semibold'>{item.title}</h3>
                            <p className='text-gray-600 text-center dark:text-gray-300'>{item.description}</p>
                            <Link href={`/certificates/${item.id}`} className='px-6 py-2 bg-[#E1306C] text-white rounded-full mt-4 hover:bg-[#C13584] transition'>
                                View Details
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className='text-center mt-10'>
                <Link href="/" className='text-gray-600 hover:text-black underline dark:text-gray-300 dark:hover:text-white'>Back to Home</Link>
            </div>
        </div>
    )
}

export default Certificates
