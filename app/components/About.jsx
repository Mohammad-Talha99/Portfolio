import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

const About = ({ isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='text-center mb-1 text-lg font-Ovo'>
        Introduction</motion.h4>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className='text-center text-5xl font-Ovo'
      >About me</motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, }}
        transition={{ duration: 0.5 }}
        className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className='w-58 sm:w-70 rounded-3xl mb-28 mx-5 max-w-none '>
          <Image src={assets.user_image} className='w-full border   bg-gray-200 rounded-2xl'
            alt='user' />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className='flex-1'>
          <p className='mb-10 mt-3 max-w-2xl font-Ovo'>
            I am a passionate Full Stack Developer & AI Engineer with expertise in building scalable, high-performance web applications and intelligent agentic systems. With a strong foundation in Java, Spring Boot, and modern frontend technologies, I have collaborated with prestigious organizations to deliver innovative digital solutions that drive business success.
          </p>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='grid grid-cols-1 sm:grid-cols-3 gap-3
            max-w-2xl'>
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className='border-[0.5px] border-gray-400
                    rounded-xl p-3 cursor-pointer hover:bg-lightHover hover:-translate-y-1 duration-500
                     hover:shadow-blackShadow dark:border-white dark:hover:shadow-white dark:hover:bg-darkHover/50 ' key={index}>
                <Image src={isDarkMode ? iconDark : icon} className='w-7 mt-3' alt={title} />
                <h3 className='my-4 font-semibold text-gray-700 dark:text-white'>{title}</h3>
                <p className='text-gray-600 text-sm dark:text-white/80'>{description}</p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.h4
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className='my-6 text-gray-700 font-Ovo font-bold dark:text-white/80'>Tools I use </motion.h4>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className='flex items-center gap-2 sm:gap-5 '>
            {toolsData.map((tool, index) => (
              <motion.li
                whileHover={{ scale: 1.1 }}
                className='flex items-center justify-center w-12 sm:w-14 aspect-square border
                 border-gray-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500'
                key={index}>
                <Image src={tool} className='w-5 sm:w-7' alt='Tool' />
              </motion.li>
            ))}

          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>


  )
}

export default About
