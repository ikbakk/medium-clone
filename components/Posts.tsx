import Link from 'next/link';
import { urlFor } from '../sanity';
import { Post } from '../typing';

interface Props {
	posts: Post[];
}

const Posts = ({ posts }: Props) => {
	return (
		<div className='grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3 '>
			{posts.map((post) => (
				<Link key={post._id} href={`/post/${post.slug.current}`}>
					<div className='group overflow-hidden rounded-lg border'>
						<img
							className='h-60 w-full object-cover transition-transform duration-100 group-hover:scale-105'
							src={urlFor(post.mainImage).url()!}
							alt='/'
						/>
						<div className='flex justify-between bg-white p-5'>
							<div>
								<p className='text-lg font-bold'>{post.title}</p>
								<p className='text-sm'>
									{post.description} by {post.author.name}
								</p>
							</div>
							<img
								className='h-12 w-12 rounded-full'
								src={urlFor(post.author.image).url()!}
								alt='/'
							/>
						</div>
					</div>
				</Link>
			))}
		</div>
	);
};

export default Posts;
