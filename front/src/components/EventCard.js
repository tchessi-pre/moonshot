import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import EventModal from './EventModal';

const getFullImageUrl = (url) => {
	const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
	return `${BASE_URL}${url}`;
};

const EventCard = ({
	id,
	name,
	category,
	description,
	date,
	participant,
	price,
	link,
	picture,
	isVerified, 
}) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const imageUrl = picture?.data?.attributes?.url
		? getFullImageUrl(picture.data.attributes.url)
		: null;

	return (
		<div
			className='flex overflow-hidden transition-transform duration-300 transform bg-white hover:scale-105'
			style={{
				height: '200px',
				width: '400px',
				marginRight: '20px',
				marginBottom: '10px',
			}}
		>
			<div className='w-1/3 h-full'>
				{imageUrl ? (
					<img
						src={imageUrl}
						alt={name}
						className='object-cover w-full h-full'
					/>
				) : (
					<div className='flex items-center justify-center w-full h-full text-sm bg-gray-200'>
						Aucune image
					</div>
				)}
			</div>
			<div className='flex flex-col justify-between w-2/3 p-4'>
				<div>
					<div className='flex items-center justify-between'>
						<div className='inline-block w-full p-1 text-sm text-white uppercase transition-colors duration-300 bg-gray-500 hover:bg-gray-700'>
							{category}
						</div>
						{isVerified && (
							<span className='px-2 py-1 ml-2 text-2xl text-white '>
								<FontAwesomeIcon
									icon={faCheckCircle}
									className='text-green-500'
								/>
							</span>
						)}
					</div>
					<h3 className='mt-3 text-sm font-bold uppercase transition-colors duration-300 hover:text-gray-700'>
						{name}
					</h3>
					<p className='mb-2 text-sm text-orange-600'>{description}</p>
					<p className='text-sm text-gray-600'>
						Date: {new Date(date).toLocaleDateString()}
					</p>
					<p className='text-sm text-gray-600'>Participants: {participant}</p>
				</div>
				<div className="flex items-center justify-between">
					<button
						onClick={openModal}
						className='text-blue-500 transition-transform duration-300 hover:underline hover:scale-110'
					>
						Plus d'infos
					</button>
					<p className='text-sm font-bold text-gray-600'>
						Prix: {price === 0 ? 'Gratuit' : `${price} €`}
					</p>
					<EventModal isOpen={modalIsOpen} onClose={closeModal} eventId={id} />
				</div>
			</div>
		</div>
	);
};

export default EventCard;
