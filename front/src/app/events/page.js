'use client';

import NavBar from '../../components/NavBar';
import EventCard from '../../components/EventCard';
import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useEventStore from '@/stores/eventStore';

const Events = () => {
	const { events, fetchEvents } = useEventStore();
	const upcomingSwiperRef = useRef(null);
	const pastSwiperRef = useRef(null);

	useEffect(() => {
		fetchEvents();
	}, [fetchEvents]);

	const handlePrev = (swiperRef) => {
		if (swiperRef.current) swiperRef.current.swiper.slidePrev();
	};

	const handleNext = (swiperRef) => {
		if (swiperRef.current) swiperRef.current.swiper.slideNext();
	};

	const upcomingEvents = Array.isArray(events)
		? events.filter((event) => new Date(event.attributes.date) >= new Date())
		: [];
	const pastEvents = Array.isArray(events)
		? events.filter((event) => new Date(event.attributes.date) < new Date())
		: [];

	return (
		<div
			className='min-h-screen bg-center bg-cover'
			style={{ backgroundImage: 'url("/assets/bground.jpg")' }}
		>
			<NavBar />
			<div className='container py-8 mx-auto'>
				<h2
					className='mb-6 text-2xl font-bold text-white'
					style={{ marginTop: '50px' }}
				>
					Événements à Venir
				</h2>
				<Swiper
					ref={upcomingSwiperRef}
					modules={[Navigation, Pagination]}
					spaceBetween={20}
					slidesPerView={1}
					breakpoints={{
						640: {
							slidesPerView: 1,
							spaceBetween: 10,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
					}}
					navigation={false}
					pagination={{ clickable: false }}
				>
					{upcomingEvents.map((event) => (
						<SwiperSlide key={event.id}>
							<EventCard
								{...event.attributes}
								picture={event.attributes.picture}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div className='flex justify-center mt-4'>
					<button
						onClick={() => handlePrev(upcomingSwiperRef)}
						className='flex items-center justify-center w-10 h-10 p-2 mr-2 text-black bg-white rounded-full hover:bg-gray-400'
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
					<button
						onClick={() => handleNext(upcomingSwiperRef)}
						className='flex items-center justify-center w-10 h-10 p-2 ml-2 text-black bg-white rounded-full hover:bg-gray-400'
					>
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>

				<h2 className='mt-12 mb-6 text-2xl font-bold text-white'>
					Événements Passés
				</h2>
				<Swiper
					ref={pastSwiperRef}
					modules={[Navigation, Pagination]}
					spaceBetween={20}
					slidesPerView={1}
					breakpoints={{
						640: {
							slidesPerView: 1,
							spaceBetween: 10,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						1024: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
					}}
					navigation={false}
					pagination={{ clickable: false }}
				>
					{pastEvents.map((event) => (
						<SwiperSlide key={event.id}>
							<EventCard
								{...event.attributes}
								picture={event.attributes.picture}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<div className='flex justify-center mt-4'>
					<button
						onClick={() => handlePrev(pastSwiperRef)}
						className='flex items-center justify-center w-10 h-10 p-2 mr-2 text-black bg-white rounded-full hover:bg-gray-400'
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
					<button
						onClick={() => handleNext(pastSwiperRef)}
						className='flex items-center justify-center w-10 h-10 p-2 ml-2 text-black bg-white rounded-full hover:bg-gray-400'
					>
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Events;
