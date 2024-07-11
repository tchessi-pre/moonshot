import React from 'react';

const interests = [
	'Musique',
	'Cuisine',
	'Soirée linguistique',
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

const InterestList = () => (
	<div className='h-[100px] overflow-y-scroll rounded scrollbar-hide bg-transparent p-4'>
		<ul>
			{interests.map((interest, index) => (
				<li
					key={index}
					className='py-1 border-gray-200 last:border-none uppercase text-white transform transition duration-400 hover:scale-105 hover:text-white hover:font-bold'
				>
					{index + 1}. {interest}
				</li>
			))}
		</ul>
	</div>
);

export default InterestList;
