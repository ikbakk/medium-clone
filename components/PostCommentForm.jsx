import React from 'react';

const PostCommentForm = () => {
	return (
		<>
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
		</>
	);
};

export default PostCommentForm;
