import React from 'react';

const EventCard = ({ image, title, subtitle, description, buttonText }) => (
	<div
		className='flex overflow-hidden bg-white shadow-md transform transition-transform duration-300 hover:scale-105'
		style={{ height: '200px', width: '480px' }}
	>
		<div className='w-1/3 h-full'>
			<img src={image} alt={title} className='object-cover w-full h-full' />
		</div>
		<div className='flex flex-col justify-between w-1/2 p-6'>
			<div>
				<div className='inline-block w-full p-1 text-white bg-gray-500 uppercase text-sm transition-colors duration-300 hover:bg-gray-700'>
					{subtitle}
				</div>
				<h3 className='text-xl font-bold mt-3 uppercase transition-colors duration-300 hover:text-gray-700'>
					{title}
				</h3>
				<p className='mb-4 text-sm text-orange-600'>{description}</p>
			</div>
			<div>
				<button className='text-blue-500 hover:underline transition-transform duration-300 hover:scale-110'>
					{buttonText}
				</button>
			</div>
		</div>
	</div>
);

export default EventCard;
