import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <header className='mx-auto flex max-w-7xl justify-between p-5'>
      <div className='flex items-center'>
        <Link href='/'>
          <div className='relative h-10 w-44 hover:cursor-pointer'>
            <Image
              className='object-contain'
              src='/assets/logo.png'
              fill
              alt='/'
            />
          </div>
        </Link>
        <div className='hidden items-center space-x-5 md:flex'>
          <h3 className='cursor-pointer'>About</h3>
          <h3 className='cursor-pointer'>Contact</h3>
          <h3 className='cursor-pointer rounded-full bg-green-600 px-4 py-1 text-white'>
            Follow
          </h3>
        </div>
      </div>
      <div className='flex items-center space-x-5 text-green-600'>
        <h3 className='hover:cursor-pointer'>Sign In</h3>
        <h3 className='rounded-full border border-green-600 px-4 py-1 duration-75 hover:cursor-pointer hover:bg-green-600 hover:text-white'>
          Get Started
        </h3>
      </div>
    </header>
  )
}

export default Header
