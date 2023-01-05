import React from 'react';

const PostCommentSubmitted = () => {
	return (
		<div className='my-10 mx-auto flex max-w-2xl flex-col bg-yellow-500 p-10 text-white'>
			<h3 className='text-3xl font-bold'>
				Thank you for submitting your comment
			</h3>
			<p>Once it has been approved, it will appear below</p>
		</div>
	);
};

export default PostCommentSubmitted;
