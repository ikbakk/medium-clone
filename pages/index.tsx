import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Posts from '../components/Posts'

const Home: NextPage = () => {
  return (
    <div className='mx-auto max-w-7xl'>
      <Head>
        <title>Medium Blog</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Banner />
      <Posts />
    </div>
  )
}

export default Home
