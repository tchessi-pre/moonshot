'use client';

import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';

const ConfirmationPage = () => {
	const searchParams = useSearchParams();
	const eventName = searchParams.get('eventName');
	const router = useRouter();

	const handleReturnToEvents = () => {
		router.push('/events');
	};

	return (
		<main
			className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
			style={{ backgroundImage: "url('/assets/bground.jpg')" }}
		>
			<NavBar />
			<div className='flex flex-col items-center justify-center p-8 mt-20 bg-black rounded-lg shadow-lg bg-opacity-70'>
				<h1 className='mb-4 text-4xl font-bold text-white'>
					Inscription réussie !
				</h1>
				<p className='mb-6 text-2xl text-white'>
					Vous êtes maintenant inscrit à l'événement{' '}
					<span className='font-bold text-yellow-400'>{eventName}</span>.
				</p>
				<Button
					className='px-6 py-3 text-lg font-semibold text-black bg-yellow-400 rounded-lg hover:bg-yellow-500'
					onClick={handleReturnToEvents}
				>
					Retourner aux événements
				</Button>
			</div>
		</main>
	);
};

export default ConfirmationPage;
