import PortableText from 'react-portable-text';
import { urlFor } from '../sanity';

interface Props {
	post: {
		_id: string;
		_createdAt: string;
		title: string;
		author: {
			name: string;
			image: string;
		};
		description: string;
		mainImage: {
			asset: {
				url: string;
			};
		};
		slug: {
			current: string;
		};
		body: object[];
	};
}

const PostContent = ({ post }: Props) => {
	return (
		<>
			<h1 className='mt-10 mb-3 text-4xl'>{post.title}</h1>
			<h2 className='text-xl font-light'>{post.description}</h2>
			<div className='flex items-center space-x-2'>
				<img
					className='h-10 w-10 rounded-full'
					src={urlFor(post.author.image).url()}
					alt='/'
				/>
				<p className=' text-sm font-extralight'>
					Blog post by{' '}
					<span className='text-green-600'>{post.author.name}</span> - Published
					at {new Date(post._createdAt).toLocaleString()}
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
		</>
	);
};

export default PostContent;
