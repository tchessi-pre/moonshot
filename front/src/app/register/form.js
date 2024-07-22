'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/component/loader';
import { fetchRegister } from '../../services/authService';

const Form = () => {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const [redirecting, setRedirecting] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError('Les mots de passe ne correspondent pas');
			return;
		}

		setLoading(true);

		try {
			const userData = {
				username,
				firstName,
				lastName,
				email,
				birthdate: birthdate ? birthdate : null,
				password,
			};
			const data = await fetchRegister(userData);

			setSuccess('Inscription réussie !');
			setError('');
			setUsername('');
			setFirstName('');
			setLastName('');
			setEmail('');
			setBirthdate('');
			setPassword('');
			setConfirmPassword('');

			setRedirecting(true);
			router.push('/login');
		} catch (error) {
			console.error(error.message);
			setError(error.message);
			setSuccess('');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='relative flex flex-col items-center justify-center min-h-screen'>
			{redirecting && <Loader />}
			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-center justify-center w-full max-w-md mx-2'
			>
				<span className='text-xl font-bold text-white uppercase'>
					Inscription
				</span>
				<div className='w-full'>
					<input
						className='w-full p-2 my-3 rounded-lg'
						placeholder="Nom d'utilisateur"
						type='text'
						id='username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className='w-full'>
					<input
						className='w-full p-2 my-3 rounded-lg'
						placeholder='Prénom'
						type='text'
						id='firstName'
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						required
					/>
				</div>
				<div className='w-full'>
					<input
						className='w-full p-2 my-3 rounded-lg'
						placeholder='Nom'
						type='text'
						id='lastName'
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						required
					/>
				</div>
				<div className='w-full'>
					<input
						className='w-full p-2 my-3 rounded-lg'
						placeholder='Email'
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div className='w-full my-3'>
					<input
						className='w-full p-2 rounded-lg'
						type='date'
						id='birthdate'
						value={birthdate}
						onChange={(e) => setBirthdate(e.target.value)}
						placeholder='Date de naissance'
						required
					/>
				</div>
				<div className='w-full'>
					<input
						className='w-full p-2 my-3 rounded-lg'
						placeholder='Mot de passe'
						type='password'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className='w-full'>
					<input
						className='w-full p-2 my-3 rounded-lg'
						placeholder='Confirmer le mot de passe'
						type='password'
						id='confirmPassword'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</div>
				{error && <div style={{ color: 'red' }}>{error}</div>}
				{success && <div style={{ color: 'green' }}>{success}</div>}
				{loading && <div style={{ color: 'blue' }}>Chargement...</div>}
				<Button type='submit' className='w-full mt-6' disabled={loading}>
					Inscription
				</Button>
				<div className='my-2 text-white'>
					<p>
						Vous avez un compte ?{' '}
						<a className='font-bold' href='/login'>
							Se connecter
						</a>
					</p>
				</div>
			</form>
		</div>
	);
};

export default Form;
