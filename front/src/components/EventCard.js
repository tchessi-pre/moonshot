import React from 'react';

const EventCard = ({ image, title, subtitle, description, buttonText }) => (
	<div
		className='flex overflow-hidden transition-transform duration-300 transform bg-white shadow-md hover:scale-105'
		style={{ height: '200px', width: '430px', marginRight: '20px' }}
	>
		<div className='w-1/3 h-full'>
			<img src={image} alt={title} className='object-cover w-full h-full' />
		</div>
		<div className='flex flex-col justify-between w-1/2 p-4'>
			<div>
				<div className='inline-block w-full p-1 text-sm text-white uppercase transition-colors duration-300 bg-gray-500 hover:bg-gray-700'>
					{subtitle}
				</div>
				<h3 className='mt-3 text-sm font-bold uppercase transition-colors duration-300 hover:text-gray-700'>
					{title}
				</h3>
				<p className='mb-2 text-sm text-orange-600'>{description}</p>
			</div>
			<div>
				<button className='text-blue-500 transition-transform duration-300 hover:underline hover:scale-110'>
					{buttonText}
				</button>
			</div>
		</div>
	</div>
);

export default EventCard;
