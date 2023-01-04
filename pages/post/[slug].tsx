import { GetStaticProps } from 'next';
import { sanityClient } from '../../sanity';
import { Post } from '../../typing';
import { urlFor } from '../../sanity';

interface Props {
	post: Post;
}

function Post({ post }: Props) {
	console.log(post);
	return (
		<div>
			<article className='mx-auto max-w-3xl p-5'>
				<h1 className='mt-10 mb-3 text-4xl'>{post.title}</h1>
				<h2 className='text-xl font-light'>{post.description}</h2>
				<div>
					<img src={urlFor(post.author.image).url()} alt='/' />
				</div>
			</article>
		</div>
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
