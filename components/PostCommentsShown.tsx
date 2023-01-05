import { Comment } from '../typing';

interface Props {
	post: {
		_id: string;
		_createdAt: string;
		title: string;
		author: {
			name: string;
			image: string;
		};
		comments: Comment[];
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

const PostCommentsShown = ({ post }: Props) => {
	return (
		<div className='my-10 mx-auto flex max-w-2xl flex-col space-y-2 p-10'>
			<h3 className='text-4xl'>Comments</h3>
			<hr className='pb-2' />
			{post.comments.map((comment) => (
				<div key={comment._id}>
					<p>
						<span className='text-yellow-500'>{comment.name}: </span>
						{comment.comment}
					</p>
				</div>
			))}
		</div>
	);
};

export default PostCommentsShown;
