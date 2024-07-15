'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import useFetch from '../../hooks/useFetch';

const Form = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { data, error, loading, fetchData } = useFetch();
	const router = useRouter();
	const [submitError, setSubmitError] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmitError('');

		// à changer quand back fait

		// await fetchData('http://127.0.0.1:8000/api/login', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	data: { email, password },
		// 	withCredentials: true,
		// });
	};

	// useEffect(() => {
	// 	if (data) {
	// 		router.push('/informations_private'); // Rediriger l'utilisateur après une connexion réussie
	// 	}
	// }, [data, router]);

	// useEffect(() => {
	// 	if (error) {
	// 		console.error(error);
	// 		setSubmitError(
	// 			"Erreur lors de la connexion. Veuillez vérifier vos informations d'identification."
	// 		);
	// 	}
	// }, [error]);

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center justify-center w-full max-w-md'
		>

			<div className='w-full'>
			<label className="font-bold">Nom</label>
					<input
						className='w-full p-2 my-3 rounded-lg'
						placeholder='Nom'
						type='text'
						id='lastName'
						value={''}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
			</div>

			<div className='w-full'>
				<label className="font-bold">Prénom</label>
					<input
						className='w-full p-2 my-3 rounded-lg'
						placeholder='Prénom'
						type='text'
						id='firstName'
						value={''}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
			</div>
			<div className='w-full'>
				<label className="font-bold">Localisation</label>
					<input
						className='w-full p-2 my-3 rounded-lg'
						placeholder='Localisation'
						type='text'
						id='localisation'
						value={''}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
			</div>


			{submitError && <div className='text-red-500'>{submitError}</div>}
			{loading && <div className='text-blue-500'>Chargement...</div>}
		</form>
	);
};

export default Form;
