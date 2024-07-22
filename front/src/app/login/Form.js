'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchLogin } from '../../services/authService';

const Form = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Vérifiez si l'utilisateur est déjà connecté
		const token = sessionStorage.getItem('token');
		if (token) {
			router.replace('/events'); // Rediriger si l'utilisateur est déjà connecté
		}
	}, [router]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			await fetchLogin(email, password); // La fonction fetchLogin enregistre déjà les données dans sessionStorage
			toast.success('Connexion réussie !');
			router.replace('/events');
		} catch (error) {
			console.error(error.message);
			toast.error(error.message);
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
