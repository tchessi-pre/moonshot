'use client';

import React, { useState, useEffect } from 'react';

const getFullImageUrl = (url) => {
	const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
	return `${BASE_URL}${url}`;
};

export const ProfilePictureForm = ({ profilePicture, setProfilePicture }) => {
	const [preview, setPreview] = useState(null);

	useEffect(() => {
		if (profilePicture && typeof profilePicture === 'string') {
			setPreview(getFullImageUrl(profilePicture));
		}
	}, [profilePicture]);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
				setProfilePicture(file);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className='flex flex-col items-center'>
			<label className='block mb-2 font-bold uppercase'>Mon profil</label>
			{preview ? (
				<img
					src={preview}
					alt='Photo de profil'
					className='object-cover w-32 h-32 mb-4 border-4 rounded-full'
				/>
			) : (
				<div className='flex items-center justify-center w-32 h-32 mb-4 bg-gray-300 rounded-full'>
					<span className='text-gray-500'>Pas de photo</span>
				</div>
			)}
			<label className='px-4 py-2 text-white bg-blue-500 rounded cursor-pointer'>
				Changer la photo
				<input
					type='file'
					accept='image/*'
					onChange={handleFileChange}
					className='hidden'
				/>
			</label>
		</div>
	);
};
