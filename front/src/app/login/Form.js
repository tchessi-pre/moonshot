'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		console.log('Email:', email);
		console.log('Password:', password);

		try {
			const response = await fetch('http://127.0.0.1:8000/api/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();

			console.log('Response data:', data); // Log the response data

			if (response.ok) {
				// Sauvegarder le token et l'ID de l'utilisateur dans le localStorage
				localStorage.setItem('token', data.token);
				localStorage.setItem('user_id', data.user_id);

				console.log('Token:', data.token); // Log the token
				console.log('User ID:', data.user_id); // Log the user ID

				toast.success('Connexion réussie !');
				router.push('/events');
			} else {
				toast.error(data.message || 'Erreur lors de la connexion.');
			}
		} catch (error) {
			console.error('Erreur de connexion:', error);
			toast.error('Erreur lors de la connexion.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-center justify-center w-full max-w-md'
			>
				<span className='text-xl font-bold text-white uppercase'>
					Connexion
				</span>

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
			<ToastContainer />
		</>
	);
};

export default Form;
