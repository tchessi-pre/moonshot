'use client';

import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import VerticalMenu from '@/components/VerticalMenu';
import Pagination from '@/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const languageEvents = [
	{
		image: '/assets/langue1.jpg',
		title: 'LANGUES DU MONDE',
		subtitle: 'La beauté de la langue japonaise',
		description: "Découvrez la culture et l'histoire de la langue japonaise.",
		buttonText: 'En savoir plus',
		participants: 15,
		verified: true,
	},
	{
		image: '/assets/langue2.jpg',
		title: 'LANGUES DU MONDE',
		subtitle: 'Les mystères du mandarin',
		description: 'Plongez dans les mystères et la complexité du mandarin.',
		buttonText: 'En savoir plus',
		participants: 25,
		verified: true,
	},
	{
		image: '/assets/langue3.jpg',
		title: 'LANGUES DU MONDE',
		subtitle: "La richesse de l'espagnol",
		description: 'Apprenez les nuances et la richesse de la langue espagnole.',
		buttonText: 'En savoir plus',
		participants: 30,
		verified: true,
	},
	{
		image: '/assets/langue4.jpg',
		title: 'LANGUES DU MONDE',
		subtitle: "L'élégance de l'italien",
		description:
			"Découvrez l'élégance et la musicalité de la langue italienne.",
		buttonText: 'En savoir plus',
		participants: 20,
		verified: true,
	},
	{
		image: '/assets/langue1.jpg',
		title: 'LANGUES DU MONDE',
		subtitle: 'La beauté de la langue japonaise',
		description: "Découvrez la culture et l'histoire de la langue japonaise.",
		buttonText: 'En savoir plus',
		participants: 15,
		verified: true,
	},
	{
		image: '/assets/langue2.jpg',
		title: 'LANGUES DU MONDE',
		subtitle: 'Les mystères du mandarin',
		description: 'Plongez dans les mystères et la complexité du mandarin.',
		buttonText: 'En savoir plus',
		participants: 25,
		verified: true,
	},
	{
		image: '/assets/langue3.jpg',
		title: 'LANGUES DU MONDE',
		subtitle: "La richesse de l'espagnol",
		description: 'Apprenez les nuances et la richesse de la langue espagnole.',
		buttonText: 'En savoir plus',
		participants: 30,
		verified: true,
	},
	{
		image: '/assets/langue4.jpg',
		title: 'LANGUES DU MONDE',
		subtitle: "L'élégance de l'italien",
		description:
			"Découvrez l'élégance et la musicalité de la langue italienne.",
		buttonText: 'En savoir plus',
		participants: 20,
		verified: true,
	},
];

const LanguagePage = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [isAnimating, setIsAnimating] = useState(false);
	const itemsPerPage = 6; // Nombre d'éléments par page

	// Calculer les éléments à afficher pour la page actuelle
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = languageEvents.slice(indexOfFirstItem, indexOfLastItem);

	// Calculer le nombre total de pages
	const totalPages = Math.ceil(languageEvents.length / itemsPerPage);

	// Gérer le changement de page
	const handlePageChange = (pageNumber) => {
		setIsAnimating(true);
		setTimeout(() => {
			setCurrentPage(pageNumber);
			setIsAnimating(false);
		}, 500); // Durée de l'animation
	};

	return (
		<div
			className='min-h-screen bg-center bg-cover'
			style={{ backgroundImage: 'url("/assets/bground.jpg")' }}
		>
			<NavBar />
			<div className='flex'>
				<div className='fixed h-full top-40 left-11'>
					<VerticalMenu />
				</div>
				<div className='container flex-1 px-4 py-8 pl-24 mx-auto'>
					<h1 className='mt-10 mb-8 text-3xl font-bold text-center text-white uppercase md:text-4xl lg:text-4xl font-roboto-condensed'>
						DÉCOUVREZ LES LANGUES DU MONDE
					</h1>
					<div
						className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ${
							isAnimating ? 'opacity-0' : 'opacity-100'
						}`}
					>
						{currentItems.map((event, index) => (
							<div
								key={index}
								className='relative overflow-hidden transition-transform duration-300 ease-in-out transform bg-white border-t-4 border-b-4 border-white rounded-lg shadow-lg group'
							>
								<img
									src={event.image}
									alt={event.title}
									className='object-cover w-full h-64 transition-opacity duration-300 rounded-t-lg md:h-48 lg:h-64 group-hover:opacity-0'
								/>
								<div className='absolute inset-0 flex flex-col justify-center p-4 transition duration-300 ease-in-out transform translate-y-full bg-white bg-opacity-80 group-hover:translate-y-0'>
									<h2 className='flex items-center text-xl font-bold text-black md:text-2xl'>
										{event.title}
										{event.verified && (
											<FontAwesomeIcon
												icon={faCheckCircle}
												className='ml-2 text-green-500'
												style={{ width: '1em', height: '1em' }}
											/>
										)}
									</h2>
									<p className='text-sm text-orange-600 md:text-lg'>
										{event.subtitle}
									</p>
									<p className='mt-2 text-sm text-gray-700'>
										{event.description}
									</p>
									<div className='mt-4'>
										<span className='px-2 py-1 text-xs text-white bg-blue-500 rounded'>
											{event.participants} participants
										</span>
									</div>
									<button className='mt-4 text-blue-500 hover:underline'>
										{event.buttonText}
									</button>
								</div>
							</div>
						))}
					</div>
					<div className='flex justify-center mt-8'>
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LanguagePage;
