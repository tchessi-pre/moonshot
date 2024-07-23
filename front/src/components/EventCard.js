import React from 'react';

const getFullImageUrl = (url) => {
	const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
	return `${BASE_URL}${url}`;
};

const EventCard = ({
	name,
	category,
	description,
	date,
	participant,
	price,
	link,
	picture,
}) => {
	const imageUrl = picture?.data?.attributes?.url
		? getFullImageUrl(picture.data.attributes.url)
		: null;

	return (
		<div
			className='flex overflow-hidden transition-transform duration-300 transform bg-white shadow-md hover:scale-105'
			style={{ height: '200px', width: '430px', marginRight: '20px',  marginBottom: '10px' }}
		>
			<div className='w-1/3 h-full'>
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={name}
						className='object-cover w-full h-full'
					/>
				) : (
					<div className='flex items-center justify-center w-full h-full bg-gray-200'>Aucune image</div>
				)}
			</div>
			<div className='flex flex-col justify-between w-2/3 p-4'>
				<div>
					<div className='inline-block w-full p-1 text-sm text-white uppercase transition-colors duration-300 bg-gray-500 hover:bg-gray-700'>
						{category}
					</div>
					<h3 className='mt-3 text-sm font-bold uppercase transition-colors duration-300 hover:text-gray-700'>
						{name}
					</h3>
					<p className='mb-2 text-sm text-orange-600'>{description}</p>
					<p className='text-sm text-gray-600'>
						Date: {new Date(date).toLocaleDateString()}
					</p>
					<p className='text-sm text-gray-600'>Participants: {participant}</p>
					<p className='text-sm text-gray-600'>Prix: {price} €</p>
				</div>
				<div>
					<a
						href={link}
						target='_blank'
						rel='noopener noreferrer'
						className='text-blue-500 transition-transform duration-300 hover:underline hover:scale-110'
					>
						Plus d'infos
					</a>
				</div>
			</div>
		</div>
	);
};

export default EventCard;
