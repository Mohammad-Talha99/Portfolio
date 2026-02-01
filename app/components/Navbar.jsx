'use client'
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { HoverBorderGradient } from './HoverBorderGradient'

const Navbar = () => {
  const { isDarkMode, setIsDarkMode } = useTheme()

  const [isScroll, setIsScroll] = useState(false)
  const router = useRouter()

  const sideMenuRef = useRef();
  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)'
  }
  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)'
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (scrollY > 50) {
        setIsScroll(true)
      } else {
        setIsScroll(false)
      }
    })
  }, [])

  return (
    <>

      <div className='fixed top-0 right-0 w-11/12  -z-10 translate-y-[-80%] dark:hidden '>
        <Image src={assets.header_bg_color} className='w-full' alt='' />
      </div>
      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%]
      py-4 flex item-center justify-between z-50 
      ${isScroll ? " backdrop-blur-sm shadow-sm dark:bg-darkTheme dark:bg-transparent  dark:shadow-white/20" : ""}`}>
        <a href="#top">

          <Image src={isDarkMode ? assets.logo_dark : assets.logo} className='w-15 py-6
             mr-14' alt='' />

        </a>

        <ul className={`hidden  md:flex items-centre gap-6 lg:gap-8
        round-full px-12 py-3 ${isScroll ? "" : "bg-white rounded-full shadow-sm bg-opacity-50 dark:border dark:border-white/50 dark:bg-transparent cursor-pointer"} `}>
          <li className='hover:bg-lightHover hover:-translate-y-1 duration-500 cursor-pointer  px-3 py-1 rounded-md dark:hover:bg-darkHover '><Link className='font-Ovo' href="/#top">Home</Link></li>
          <li className='hover:bg-lightHover hover:-translate-y-1 duration-500 cursor-pointer  px-3 py-1 rounded-md dark:hover:bg-darkHover '><Link className='font-Ovo' href="/#about">About me</Link></li>
          <li className='hover:bg-lightHover hover:-translate-y-1 duration-500 cursor-pointer  px-3 py-1 rounded-md dark:hover:bg-darkHover '><Link className='font-Ovo' href="/#services">Services</Link></li>
          <li className='hover:bg-lightHover hover:-translate-y-1 duration-500 cursor-pointer  px-3 py-1 rounded-md dark:hover:bg-darkHover '><Link className='font-Ovo' href="/#work">My Work</Link></li>
          <li className='hover:bg-lightHover hover:-translate-y-1 duration-500 cursor-pointer  px-3 py-1 rounded-md dark:hover:bg-darkHover '><Link className='font-Ovo' href="/#contact">Contact me</Link></li>
          <li className='hover:bg-lightHover hover:-translate-y-1 duration-500 cursor-pointer  px-3 py-1 rounded-md dark:hover:bg-darkHover '><Link className='font-Ovo' href="/certificates">Certificates</Link></li>
        </ul>


        <div className='flex items-center gap-4'>

          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="hover:bg-lightHover dark:hover:bg-darkHover hover:-translate-y-1 duration-500 dark:bg-black bg-blue-20 text-black dark:text-white flex items-center gap-2 font-Ovo"
            onClick={() => router.push('/chat')}
          >
            <span>Chat with AI</span>

          </HoverBorderGradient>

          <button onClick={() => setIsDarkMode(prev => !prev)}>
            <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} className='w-6 cursor-pointer' alt='' />
          </button>
          {/* <a href="#contact" className='hidden  lg:flex items-center gap-3
           cursor-pointer px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo dark:border-white/50'>Contact
            <Image src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon} className='w-3' alt='' /></a> */}

          <button className='block md:hidden ml-3' onClick={openMenu}>
            <Image src={isDarkMode ? assets.menu_white : assets.menu_black} className='w-6 cursor-pointer' alt='' />
          </button>

        </div>

        {/* { mobile menu} */}


        <ul ref={sideMenuRef} className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-64
        top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-500 dark:bg-darkHover dark:text-white'>

          <div className='absolute right-6 top-6' onClick={closeMenu}>
            <Image src={isDarkMode ? assets.close_white : assets.close_black} className='w-5 cursor-pointer' alt='' />
          </div>

          <li><Link className='font-Ovo ' onClick={closeMenu} href="/#top">Home</Link></li>
          <li><Link className='font-Ovo ' onClick={closeMenu} href="/#about">About me</Link></li>
          <li><Link className='font-Ovo ' onClick={closeMenu} href="/#services">Services</Link></li>
          <li><Link className='font-Ovo ' onClick={closeMenu} href="/#work">My Work</Link></li>
          <li><Link className='font-Ovo ' onClick={closeMenu} href="/#contact">Contact me</Link></li>
          <li><Link className='font-Ovo ' onClick={closeMenu} href="/certificates">Certificates</Link></li>
          {/* <li><button className='font-Ovo flex items-center gap-2' onClick={() => { closeMenu(); router.push('/chat'); }}>
            Chat with AI

          </button></li> */}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
