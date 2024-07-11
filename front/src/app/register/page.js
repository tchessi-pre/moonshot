'use client';

import React, { useState } from 'react';
import { Form } from './form';

export default function Register() {
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSuccess = (message) => {
		setSuccess(message);
	};

	const handleError = (message) => {
		setError(message);
	};

	const handleLoading = (isLoading) => {
		setLoading(isLoading);
	};

	return (
		<main
			className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
			style={{ backgroundImage: "url('/assets/bground.jpg')" }}
		>
			<div className='flex flex-col'>
				<Form
					onSuccess={handleSuccess}
					onError={handleError}
					onLoading={handleLoading}
				/>
			</div>
		</main>
	);
}
