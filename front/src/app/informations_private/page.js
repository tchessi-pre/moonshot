'use client';

import React from 'react';
import  UserInfo  from './UserInfo'; // Assurez-vous de l'importer correctement
import NavBar from '@/components/NavBar'; // Assurez-vous de l'importer correctement

const InformationsPrivate = () => {
	return (
		<main
			className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
			style={{ backgroundImage: "url('/assets/bground.jpg')" }}
		>
			<NavBar />
			<UserInfo />
		</main>
	);
};

export default InformationsPrivate;
