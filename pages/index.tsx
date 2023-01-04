import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Banner from '../components/Banner'

const Home: NextPage = () => {
  return (
    <div className='mx-auto max-w-7xl'>
      <Head>
        <title>Medium Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Banner />
    </div>
  )
}

export default Home
