import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

const Services = () => {
  console.log("Services :", serviceData)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="services" className='w-full  px-[1%] py-10 scroll-mt-20'>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='text-center text-5xl font-Ovo'
      >My Services</motion.h2>

      <motion.p
        initial={{ y: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>
        I am a Full Stack Developer & AI Engineer specializing in agentic AI solutions, robust mobile & web applications, and intuitive UI/UX design.</motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className='grid grid-cols-auto  md:w-250 lg:w-270 md:mx-auto gap-3 my-5 '>
        {serviceData.map(({ icon, title, description, link, variant }, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            key={index}
            className='border border-gray-400 rounded-2xl px-10 py-12 hover:shadow-blackShadow 
              cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500 dark:hover:bg-darkHover 
              dark:hover:shadow-white'>

            {variant === 'pink-box' ? (
              <div className='w-10 h-10 bg-[#E1306C] rounded-lg flex items-center justify-center'>
                <Image src={icon} className='w-6 invert mix-blend-screen' alt='' />
              </div>
            ) : (
              <Image src={icon} className='w-10' alt='' />
            )}
            <h3 className='text-lg my-4 text-gray-700 dark:text-white'>{title}</h3>
            <p className='text-sm text-gray-600 leading-5 dark:text-white/80'>
              {description}
            </p>
            <a href={link} className='flex items-center gap-2 text-sm mt-5'>
              Read more <Image src={assets.right_arrow} className='w-4' alt='' />

            </a>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default Services
