import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

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

interface FormInput {
	_id: string;
	name: string;
	email: string;
	comment: string;
}

const PostCommentForm = ({ post }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<FormInput>();

	const onSubmit: SubmitHandler<FormInput> = async (data) => {
		await fetch('/api/createComment', {
			method: 'POST',
			body: JSON.stringify(data)
		})
			.then(() => console.log(data))
			.catch((err) => console.log(err));
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='m-w-2xl mx-auto mb-10 flex flex-col p-5'>
				<h3 className='text-sm text-yellow-500'>Enjoyed this article?</h3>
				<h2 className='text-3xl font-bold'>Leave a comment below</h2>
				<hr className='mt-2 py-3' />
				<input {...register('_id')} type='hidden' name='_id' value={post._id} />
				<label className='mb-5 block '>
					<span className=' text-gray-800'>Name</span>
					<input
						{...register('name', { required: true })}
						className='mt-1 block w-full rounded border border-yellow-500 py-2 px-3 shadow ring-yellow-500 hover:ring focus:outline-none focus:ring '
						placeholder='John Connor'
						type='text'
					/>
				</label>
				<label className='mb-5 block '>
					<span className=' text-gray-800'>Email</span>
					<input
						{...register('email', { required: true })}
						className='mt-1 block w-full rounded border border-yellow-500 py-2 px-3 shadow ring-yellow-500 hover:ring focus:outline-none focus:ring'
						placeholder='example@email.com'
						type='email'
					/>
				</label>
				<label className='mb-5 block '>
					<span className=' text-gray-800'>Comment</span>
					<textarea
						{...register('comment', { required: true })}
						className='mt-1 block w-full rounded border border-yellow-500 py-2 px-3  shadow ring-yellow-500 hover:ring focus:outline-none focus:ring'
						placeholder='John Approved this'
						rows={8}
					/>
				</label>
				<div className='flex flex-col p-5'>
					{errors.name && <span>- The Name Field is required</span>}
					{errors.email && <span>- The Email Field is required</span>}
					{errors.comment && <span>- The Comment Field is required</span>}
				</div>
				<input
					className='focus:`shadow-outline cursor-pointer rounded bg-yellow-500 py-2 px-4 font-bold text-white shadow hover:bg-yellow-400 focus:outline-none'
					type='submit'
				/>
			</form>
		</>
	);
};

export default PostCommentForm;
