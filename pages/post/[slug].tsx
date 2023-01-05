import Head from 'next/head';
import PostContent from '../../components/PostContent';
import PostCommentForm from '../../components/PostCommentForm';
import { GetStaticProps } from 'next';
import { sanityClient } from '../../sanity';
import { Post } from '../../typing';

interface Props {
	post: Post;
}

function Post({ post }: Props) {
	return (
		<>
			<Head>
				<title>{post.title}</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<article className='mx-auto max-w-3xl p-5'>
				<PostContent post={post} />
				<hr className='my-5 mx-auto max-w-lg border border-yellow-500' />
				<PostCommentForm post={post} />
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
