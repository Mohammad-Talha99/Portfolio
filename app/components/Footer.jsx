import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Footer = ({isDarkMode}) => {
  return (
    <div className='mt-20'>
      <div className='text-center'>
        <Image src={ isDarkMode ? assets.logo_dark : assets.logo} className='w-20 mx-auto mb-2' alt='' />

        <div className='w-max flex items-center gap-2 mx-auto'>
            <Image src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon} className='w-6' alt=''/>
            talhafareed99@gmail.com
        </div>
      </div>

      <div className='text-center sm:flex items-center justify-between border-t
      border-gray-400 mx-[10%] mt-12 py-6'>
        <p>@ 2025 Talha. All right reserved.</p>
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0 cursor-pointer'>
            <li><a target='_blank' href="https://www.linkedin.com/in/mohammad-talha99/">LinkedIn</a></li>
            <li><a target='_blank' href="https://github.com/Mohammad-Talha99">GitHub</a></li>
            <li><a target='_blank' href="https://x.com/mohammadta81988?s=11">Twitter</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
