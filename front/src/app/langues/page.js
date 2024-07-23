'use client';

import React, { useState, useEffect } from 'react';
import NavBar from '@/components/NavBar';
import VerticalMenu from '@/components/VerticalMenu';
import Pagination from '@/components/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import useEventStore from '@/stores/eventStore';

const getFullImageUrl = (url) => {
	const BASE_URL = process.env.NEXT_PUBLIC_API_HOST;
	return url ? `${BASE_URL}${url}` : '/assets/event-placeholder.png';
};

const LanguagePage = () => {
	const { events, fetchEvents } = useEventStore();
	const [currentPage, setCurrentPage] = useState(1);
	const [isAnimating, setIsAnimating] = useState(false);
	const itemsPerPage = 6; // Nombre d'éléments par page

	useEffect(() => {
		const fetchAndFilterEvents = async () => {
			await fetchEvents();
		};

		fetchAndFilterEvents();
	}, [fetchEvents]);

	const handlePageChange = (pageNumber) => {
		setIsAnimating(true);
		setTimeout(() => {
			setCurrentPage(pageNumber);
			setIsAnimating(false);
		}, 500); // Durée de l'animation
	};

	// Filtrer les événements pour n'afficher que ceux de la catégorie "Langues"
	const languageEvents = events.filter(
		(event) => event.attributes.category === 'Langues'
	);

	// Calculer les éléments à afficher pour la page actuelle
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = languageEvents.slice(indexOfFirstItem, indexOfLastItem);

	// Calculer le nombre total de pages
	const totalPages = Math.ceil(languageEvents.length / itemsPerPage);

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
					<h1 className='mt-10 mb-8 font-bold text-center text-white uppercase md:text-4xl lg:text-4xl font-roboto-condensed'>
						DÉCOUVREZ LES LANGUES DU MONDE
					</h1>
					<div
						className={`grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-500 ${
							isAnimating ? 'opacity-0' : 'opacity-100'
						}`}
					>
						{currentItems.map((event) => (
							<div
								key={event.id}
								className='relative overflow-hidden transition-transform duration-300 ease-in-out transform bg-white border-t-4 border-b-4 border-white rounded-lg shadow-lg group'
							>
								<img
									src={getFullImageUrl(
										event.attributes.picture?.data?.attributes?.url
									)}
									alt={event.attributes.name}
									className='object-cover w-full h-64 transition-opacity duration-300 rounded-t-lg md:h-48 lg:h-64 group-hover:opacity-0'
								/>
								<div className='absolute inset-0 flex flex-col justify-center p-4 transition duration-300 ease-in-out transform translate-y-full bg-white bg-opacity-80 group-hover:translate-y-0'>
									<h2 className='flex items-center text-xl font-bold text-black md:text-2xl'>
										{event.attributes.name}
										{event.attributes.isVerified && (
											<span className='flex items-center ml-2 text-green-500'>
												<FontAwesomeIcon
													icon={faCheckCircle}
													className='mr-1'
												/>
												Vérifié
											</span>
										)}
									</h2>
									<p className='text-sm text-orange-600 md:text-lg'>
										{event.attributes.category}
									</p>
									<p className='mt-2 text-sm text-gray-700'>
										{event.attributes.description}
									</p>
									<div className='mt-4'>
										<span className='px-2 py-1 text-xs text-white bg-blue-500 rounded'>
											Participants: {event.attributes.participant}
										</span>
									</div>
									<a
										href={event.attributes.link}
										target='_blank'
										rel='noopener noreferrer'
										className='mt-4 text-blue-500 hover:underline'
									>
										{event.attributes.buttonText || 'En savoir plus'}
									</a>
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
