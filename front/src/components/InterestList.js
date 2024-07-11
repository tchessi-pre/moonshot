import React from 'react';

const interests = [
	'Sport',
	'Technologie',
	'Lecture',
	'Voyage',
	'Cinéma',
	'Photographie',
	'Peinture',
	'Jardinage',
	'Yoga',
	'Danse',
	'Théâtre',
	'Bénévolat',
	'Astronomie',
	'Randonnée',
	'Cyclisme',
	'Méditation',
	'Jeux vidéo',
	'Programmation',
	'Sculpture',
	'Cuisine végétarienne',
	'Fitness',
	'Blogging',
];

const handleClick = (interest) => {
	alert(`You clicked on ${interest}`);
};

const InterestList = () => (
	<div className='h-[100px] overflow-y-scroll rounded scrollbar-hide bg-transparent p-4'>
		<ul>
			{interests.map((interest, index) => (
				<li
					key={index}
					className='py-1 border-gray-200 last:border-none uppercase text-white transform transition duration-400 hover:scale-105 hover:text-white hover:font-bold cursor-pointer'
					style={{
						color: 'rgba(255, 255, 255, 0.5)',
					}}
					onMouseEnter={(e) =>
						(e.target.style.color = 'rgba(255, 255, 255, 1)')
					}
					onMouseLeave={(e) =>
						(e.target.style.color = 'rgba(255, 255, 255, 0.5)')
					}
					onClick={() => handleClick(interest)}
				>
					{index + 1}. {interest}
				</li>
			))}
		</ul>
	</div>
);

export default InterestList;
