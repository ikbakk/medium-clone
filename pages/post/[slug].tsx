import PortableText from 'react-portable-text';
import Head from 'next/head';
import PostContent from '../../components/PostContent';
import { GetStaticProps } from 'next';
import { sanityClient } from '../../sanity';
import { Post } from '../../typing';
import { urlFor } from '../../sanity';

interface Props {
	post: Post;
}

function Post({ post }: Props) {
	const date: string = new Date(post._createdAt).toLocaleDateString();
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<article className='mx-auto max-w-3xl p-5'>
				<h1 className='mt-10 mb-3 text-4xl'>{post.title}</h1>
				<h2 className='text-xl font-light'>{post.description}</h2>
				<div className='flex items-center space-x-2 pt-3'>
					<img
						className='h-10 w-10 rounded-full'
						src={urlFor(post.author.image).url()}
						alt='/'
					/>
					<p className=' text-sm font-extralight'>
						Blog post by{' '}
						<span className='text-green-600'>{post.author.name}</span> -
						Published at {date}
					</p>
				</div>
				<div className='mt-10'>
					<PortableText
						dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
						projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
						content={post.body}
						serializers={{
							h1: (props: any) => {
								<h1 className='my-5 text-2xl font-bold' {...props} />;
							},
							h2: (props: any) => {
								<h2 className='my-5 text-xl font-bold' {...props} />;
							},
							li: ({ children }: any) => {
								<li className='ml-4 list-disc'>{children}</li>;
							},
							link: ({ href, children }: any) => {
								<a href={href} className='my-5 font-bold text-blue-500'>
									{children}
								</a>;
							}
						}}
					/>
				</div>
				<hr className='my-5 mx-auto max-w-lg border border-yellow-500' />
				<form className='m-w-2xl mx-auto mb-10 flex flex-col p-5'>
					<label className='mb-5 block '>
						<span className=' text-gray-800'>Name</span>
						<input
							className='mt-1 block w-full rounded border border-yellow-500 py-2 px-3 shadow ring-yellow-500 hover:ring focus:outline-none focus:ring '
							placeholder='John Connor'
							type='text'
						/>
					</label>
					<label className='mb-5 block '>
						<span className=' text-gray-800'>Email</span>
						<input
							className='mt-1 block w-full rounded border border-yellow-500 py-2 px-3 shadow ring-yellow-500 hover:ring focus:outline-none focus:ring'
							placeholder='example@email.com'
							type='email'
						/>
					</label>
					<label className='mb-5 block '>
						<span className=' text-gray-800'>Comment</span>
						<textarea
							className='mt-1 block w-full rounded border border-yellow-500 py-2 px-3  shadow ring-yellow-500 hover:ring focus:outline-none focus:ring'
							placeholder='John Approved this'
							rows={8}
						/>
					</label>
				</form>
			</article>
		</>
	);
}

export default Post;

export const getStaticPaths = async () => {
	const query = `*[_type == "post"]{
    _id, 
    slug {
      current
    }
  }`;
	const posts = await sanityClient.fetch(query);
	const paths = posts.map((post: Post) => ({
		params: {
			slug: post.slug.current
		}
	}));

	return {
		paths,
		fallback: 'blocking'
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const query = `*[_type == "post" && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    description,
    'comments': *[_type == "comment" && post._ref == *._id && approved == true],
    mainImage,
    slug,
    body
  }`;

	const post = await sanityClient.fetch(query, {
		slug: params?.slug
	});

	if (!post) {
		return {
			notFound: true
		};
	}

	return {
		props: {
			post
		},
		revalidate: 60
	};
};
