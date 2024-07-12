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

		await fetchData('http://127.0.0.1:8000/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			data: { email, password },
			withCredentials: true,
		});
	};

	useEffect(() => {
		if (data) {
			router.push('/events'); // Rediriger l'utilisateur après une connexion réussie
		}
	}, [data, router]);

	useEffect(() => {
		if (error) {
			console.error(error);
			setSubmitError(
				"Erreur lors de la connexion. Veuillez vérifier vos informations d'identification."
			);
		}
	}, [error]);

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col items-center justify-center w-full max-w-md'
		>
			<span className='text-xl font-bold text-white uppercase'>Connexion</span>

			<div>
				<input
					className='p-2 my-5 rounded-lg'
					type='email'
					id='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div>
				<input
					className='p-2 my-5 rounded-lg'
					type='password'
					placeholder='Mot de passe'
					id='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			{submitError && <div className='text-red-500'>{submitError}</div>}
			{loading && <div className='text-blue-500'>Chargement...</div>}
			<Button type='submit' disabled={loading}>
				Se connecter
			</Button>
			<div className='my-3'>
				<p className='text-white'>
					Pas encore inscrit ?{' '}
					<a className='font-bold' href='/register'>
						S'inscrire
					</a>
				</p>
			</div>
		</form>
	);
};

export default Form;
