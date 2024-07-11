'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import EventCard from '../components/EventCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// import './styles.css'; // Assurez-vous que le chemin est correct

// Exemple de données des cartes
const eventCards = [
	{
		image: '/assets/inde.jpg',
		title: 'Soirée musique',
		subtitle: 'Spécialité indienne',
		description: "Description de l'événement 1",
		buttonText: 'En savoir plus',
	},
	{
		image: '/assets/vietnam.jpg',
		title: 'Soirée dinatoire',
		subtitle: 'Soirée asiatique',
		description: "Description de l'événement 2",
		buttonText: 'En savoir plus',
	},
	// Ajoutez plus de cartes ici
];

export default function Home() {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	const handlePrev = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? eventCards.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prevIndex) =>
			prevIndex === eventCards.length - 1 ? 0 : prevIndex + 1
		);
	};

	const onAnimationEnd = () => {
		setIsAnimating(false);
	};

	return (
		<main
			className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
			style={{ backgroundImage: "url('/assets/bground.jpg')" }}
		>
			<NavBar />
			<div className='p-8 mt-20 text-center text-white bg-black bg-opacity-0 rounded-lg'>
				<div className='flex items-center justify-center'>
					<Image
						src='/assets/circle-center.png'
						alt='Your Image Description'
						width={500}
						height={500}
						className='rounded-full'
					/>
				</div>
			</div>
			<div className='absolute bottom-4 right-4'>
				<div className='flex items-center'>
					<button
						onClick={handlePrev}
						className='w-10 h-10 p-2 mr-1 text-black bg-white rounded-full flex items-center justify-center hover:bg-gray-400'
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
					<button
						onClick={handleNext}
						className='w-10 h-10 p-2 ml-2 mr-3 text-black bg-white rounded-full flex items-center justify-center hover:bg-gray-400'
					>
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
					<div className='relative w-[480px] h-[200px] overflow-hidden'>
						{eventCards.map((card, index) => (
							<div
								key={index}
								className={`absolute inset-0 transition-transform transform ${
									index === currentIndex
										? 'translate-x-0'
										: index < currentIndex
										? '-translate-x-full'
										: 'translate-x-full'
								}`}
								onTransitionEnd={onAnimationEnd}
							>
								<EventCard {...card} />
							</div>
						))}
					</div>
				</div>
			</div>
		</main>
	);
}
