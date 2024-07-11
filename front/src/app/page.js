'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import EventCard from '../components/EventCard';
import InterestList from '../components/InterestList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import VerticalMenu from '../components/VerticalMenu';
import './globals.css'; // Assurez-vous que le chemin est correct

// Exemple de données des cartes
const eventCards = [
	{
		image: '/assets/inde.jpg',
		title: 'Evénement 1',
		subtitle: 'Événement indien',
		description: "Description de l'événement 1",
		buttonText: 'En savoir plus',
	},
	{
		image: '/assets/vietnam.jpg',
		title: 'Evénement 2',
		subtitle: 'Soirée asiatique',
		description: "Description de l'événement 2",
		buttonText: 'En savoir plus',
	},
	{
		image: '/assets/asia-street.jpg',
		title: 'Evénement 3',
		subtitle: 'Festival italien',
		description: "Description de l'événement 3",
		buttonText: 'En savoir plus',
	},
	{
		image: '/assets/desert.jpg',
		title: 'Evénement 4',
		subtitle: 'Carnaval brésilien',
		description: "Description de l'événement 4",
		buttonText: 'En savoir plus',
	},
	{
		image: '/assets/japon_estampe.png',
		title: 'Découverte',
		subtitle: 'Fête japonaise',
		description: "Description de l'événement 5",
		buttonText: 'En savoir plus',
	},
	{
		image: '/assets/event1.png',
		title: 'Evénement 6',
		subtitle: 'Bastille Day',
		description: "Description de l'événement 6",
		buttonText: 'En savoir plus',
	},
	{
		image: '/assets/tango.png',
		title: 'Evénement 7',
		subtitle: '4th of July',
		description: "Description de l'événement 7",
		buttonText: 'En savoir plus',
	},
	{
		image: '/assets/china-6788187_1280.jpg',
		title: 'Evénement 8',
		subtitle: 'Nouvel An Chinois',
		description: "Description de l'événement 8",
		buttonText: 'En savoir plus',
	},
	{
		image: '/assets/torii.jpg',
		title: 'Evénement 9',
		subtitle: 'Fête espagnole',
		description: "Description de l'événement 9",
		buttonText: 'En savoir plus',
	},
	{
		image: '/assets/vietnam.jpg',
		title: 'Evénement 10',
		subtitle: 'Dia de los Muertos',
		description: "Description de l'événement 10",
		buttonText: 'En savoir plus',
	},
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
				<div className='flex items-center justify-center animate-spin-slow'>
					<Image
						src='/assets/circle-center.png'
						alt='Your Image Description'
						width={500}
						height={500}
						className='rounded-full'
					/>
				</div>
			</div>
			<div className='absolute bottom-[15rem] right-2 flex items-center'>
				<h3 className='text-white mr-4'>Nos actualités</h3>
				<button
					onClick={handlePrev}
					className=' w-10 h-10 p-2 mr-1 text-black bg-white rounded-full flex items-center justify-center hover:bg-gray-400'
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>
				<button
					onClick={handleNext}
					className='w-10 h-10 p-2 ml-2 mr-3 text-black bg-white rounded-full flex items-center justify-center hover:bg-gray-400'
				>
					<FontAwesomeIcon icon={faArrowRight} />
				</button>
			</div>
			<div className='absolute bottom-4 right-4'>
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
			<div className='absolute top-20 left-24 mb-2'>
				{/* <h2 className='text-lg text-white mb-10 ml-4 uppercase'>
					Centre d'intérêt
				</h2> */}
				<InterestList />
			</div>
			<div className='mt-4 absolute bottom-40 left-24'>
				<VerticalMenu />
			</div>
		</main>
	);
}
