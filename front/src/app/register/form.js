'use client';
import React, { useState, forwardRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/component/loader';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import useFetch from '../../hooks/useFetch';

const Form = () => {
	const router = useRouter();
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [birthdate, setBirthdate] = useState(null);
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);
	const [redirecting, setRedirecting] = useState(false);

	const {
		data,
		error: fetchError,
		loading: fetchLoading,
		fetchData,
	} = useFetch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			setError('Les mots de passe ne correspondent pas');
			return;
		}

		setLoading(true);

		await fetchData('https://127.0.0.1:8000/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				firstName,
				lastName,
				email,
				birthdate: birthdate ? birthdate.toISOString().split('T')[0] : null,
				password,
			},
			withCredentials: true,
		});
	};

	useEffect(() => {
		if (data) {
			setSuccess('Inscription réussie !');
			setError('');
			setFirstName('');
			setLastName('');
			setEmail('');
			setBirthdate(null);
			setPassword('');
			setConfirmPassword('');

			setRedirecting(true);
			router.push('/login');
		}
	}, [data, router]);

	useEffect(() => {
		if (fetchError) {
			console.error(fetchError);
			setError("Erreur lors de l'inscription");
			setSuccess('');
		}
		setLoading(false);
	}, [fetchError]);

	const CustomInput = forwardRef(({ value, onClick }, ref) => (
		<input
			className='p-2 text-gray-500 rounded-lg'
			placeholder='Date de naissance'
			value={value}
			onClick={onClick}
			ref={ref}
			readOnly
			style={{ textAlign: 'left', width: '100%' }}
		/>
	));

	return (
		<div className='relative flex flex-col items-center justify-center min-h-screen'>
			{redirecting && (

					<Loader />
	
			)}
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
					<DatePicker
						selected={birthdate}
						onChange={(date) => setBirthdate(date)}
						placeholderText='Date de naissance'
						customInput={<CustomInput />}
						showYearDropdown
						dateFormat='dd/MM/yyyy'
						yearDropdownItemNumber={15}
						scrollableYearDropdown
						maxDate={new Date()}
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
