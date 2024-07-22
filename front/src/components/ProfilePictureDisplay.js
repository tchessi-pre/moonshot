// 'use client';

import React from 'react';

const getFullImageUrl = (url) => {
	const BASE_URL = process.env.NEXT_PUBLIC_API_HOST; 
	return `${BASE_URL}${url}`;
};

const ProfilePictureDisplay = ({ profilePicture }) => {
	const profileImageUrl = profilePicture?.url ? getFullImageUrl(profilePicture.url) : null;

	return (
		<div className='flex flex-col items-center'>
			{profileImageUrl ? (
				<img
					src={profileImageUrl}
					alt='Photo de profil'
					className='object-cover w-32 h-32 mb-4 border-4 rounded-full'
					onError={(e) => {
						e.target.src = 'default-avatar-url';
					}}
				/>
			) : (
				<div className='flex items-center justify-center w-32 h-32 mb-4 bg-gray-300 rounded-full'>
					<span className='text-gray-500'>Pas de photo</span>
				</div>
			)}
		</div>
	);
};

export default ProfilePictureDisplay;
