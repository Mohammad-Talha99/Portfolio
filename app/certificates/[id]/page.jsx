'use client'
import { certificateData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CertificateDetails = () => {
    const params = useParams();
    const [certificate, setCertificate] = useState(null);

    useEffect(() => {
        if (params.id) {
            const data = certificateData.find(c => c.id === params.id);
            setCertificate(data);
        }
    }, [params]);

    if (!certificate) {
        return <div className='text-center mt-20'>Loading...</div>;
    }

    return (
        <div className='w-full px-[12%] py-20 pt-32'>
            <Link href="/certificates" className='text-gray-600 hover:text-black mb-8 dark:text-white dark:hover:text-white/80 inline-block'>&larr; Back to Certificates</Link>

            <div className='flex flex-col items-center gap-10 mt-10'>
                <h1 className='text-4xl font-Ovo font-bold'>{certificate.title}</h1>

                <div className='border-4 border-gray-200 p-2 rounded-xl shadow-xl'>
                    <Image src={certificate.image} alt={certificate.title} className='w-96 h-auto rounded-lg' />
                </div>

                <div className='max-w-2xl text-center space-y-4'>
                    <p className='text-xl text-gray-700 dark:text-white/80'>{certificate.description}</p>
                    <p className='text-gray-500 dark:text-white/80'>Date: {certificate.date}</p>
                </div>
            </div>
        </div>
    )
}

export default CertificateDetails
