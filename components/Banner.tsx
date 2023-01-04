import Image from 'next/image'
import React from 'react'

const Banner = () => {
  return (
    <div className='flex items-center justify-between border-y border-black bg-yellow-400 px-10 py-10 lg:py-0'>
      <div className='px-18 space-y-5'>
        <h1 className='max-w-xl font-serif text-6xl'>
          <span className='underline decoration-black decoration-4'>
            Medium
          </span>{' '}
          is a place to write, read and connect
        </h1>
        <h2 className=''>
          It's easy and free to post your thinking on any topic and connect with
          millions of readers.
        </h2>
      </div>
      <div className='relative hidden md:inline-flex md:h-32 md:w-32 lg:h-[500px] lg:w-[500px]'>
        <Image
          className='object-contain'
          src='/assets/banner-logo.png'
          alt=''
          fill
        />
      </div>
    </div>
  )
}

export default Banner
