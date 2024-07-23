'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import NavBar from '../components/NavBar';
import EventCard from '../components/EventCard';
import InterestList from '../components/InterestList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import VerticalMenu from '../components/VerticalMenu';
import axiosInstance from '@/services/axiosInstance';
import './globals.css'; // Assurez-vous que le chemin est correct

export default function Home() {
	const [events, setEvents] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await axiosInstance.get('/events?populate=*');
				setEvents(response.data.data);
			} catch (error) {
				console.error('Erreur lors de la récupération des événements:', error);
			}
		};

		fetchEvents();
	}, []);

	const handlePrev = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? events.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		if (isAnimating) return;
		setIsAnimating(true);
		setCurrentIndex((prevIndex) =>
			prevIndex === events.length - 1 ? 0 : prevIndex + 1
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
				<h3 className='mr-4 text-white'>Nos actualités</h3>
				<button
					onClick={handlePrev}
					className='flex items-center justify-center w-10 h-10 p-2 mr-2 text-black bg-white rounded-full hover:bg-gray-400'
				>
					<FontAwesomeIcon icon={faArrowLeft} />
				</button>
				<button
					onClick={handleNext}
					className='flex items-center justify-center w-10 h-10 p-2 ml-2 mr-8 text-black bg-white rounded-full hover:bg-gray-400'
				>
					<FontAwesomeIcon icon={faArrowRight} />
				</button>
			</div>
			<div className='absolute right-4 bottom-4'>
				<div className='relative w-[430px] h-[200px] overflow-hidden'>
					{events.map((event, index) => (
						<div
							key={event.id}
							className={`absolute inset-0 transition-transform transform ${
								index === currentIndex
									? 'translate-x-0'
									: index < currentIndex
									? '-translate-x-full'
									: 'translate-x-full'
							}`}
							onTransitionEnd={onAnimationEnd}
						>
							<EventCard {...event.attributes} id={event.id} />
						</div>
					))}
				</div>
			</div>
			<div className='fixed h-full top-20 left-8'>
				<InterestList />
			</div>
			<div className='fixed h-full top-64 left-11'>
				<VerticalMenu />
			</div>
		</main>
	);
}
