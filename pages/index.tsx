import type { NextPage } from 'next';
import Head from 'next/head';
import Banner from '../components/Banner';
import Posts from '../components/Posts';
import { sanityClient, urlFor } from '../sanity';
import { Post } from '../typing';

interface Props {
	posts: Post[];
}

const Home = ({ posts }: Props) => {
	return (
		<div className='mx-auto max-w-7xl'>
			<Head>
				<title>Medium Blog</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Banner />
			<Posts />
		</div>
	);
};

export default Home;

export const getServerSideProps = async () => {
	const query = `*[_type =='post' ]{
    _id,
    title,
    author,
    author=>{
      name,
      image
    },
    description,
    mainImage,
    slug,
  }`;

	const posts = await sanityClient.fetch(query);
	return {
		props: {
			posts
		}
	};
};
