'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export const ProfilePictureForm = ({ profilePicture, setProfilePicture }) => {
	const [preview, setPreview] = useState(profilePicture);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
				setProfilePicture(file); // Handle the actual upload in the parent component
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
					className='object-cover w-32 h-32 mb-4 rounded-full'
				/>
			) : (
				<div className='flex items-center justify-center w-32 h-32 mb-4 bg-gray-300 rounded-full'>
					<span className='text-gray-500'>Pas de photo</span>
				</div>
			)}
			<input
				type='file'
				accept='image/*'
				onChange={handleFileChange}
				className='mb-4'
			/>
		</div>
	);
};
