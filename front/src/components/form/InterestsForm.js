'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export const InterestsForm = ({ interests, setInterests }) => {
	const [newInterest, setNewInterest] = useState('');

	const handleAddInterest = () => {
		if (newInterest.trim()) {
			setInterests((prevInterests) => [...prevInterests, newInterest.trim()]);
			setNewInterest('');
		}
	};

	const handleRemoveInterest = (interestToRemove) => {
		setInterests((prevInterests) =>
			prevInterests.filter((interest) => interest !== interestToRemove)
		);
	};

	return (
		<div>
			<label className='block font-bold'>Centres d'intérêt: </label>
			<div className='flex flex-wrap gap-2 mt-2'>
				{interests.map((interest, index) => (
					<div
						key={index}
						className='flex items-center px-2 py-1 space-x-2 text-white bg-gray-700 rounded-lg'
					>
						<span>{interest}</span>
						<button
							type='button'
							onClick={() => handleRemoveInterest(interest)}
							className='ml-2 text-red-500'
						>
							<span className='text-lg'>×</span>
						</button>
					</div>
				))}
			</div>
			<div className='flex mt-4 space-x-2'>
				<input
					type='text'
					value={newInterest}
					onChange={(e) => setNewInterest(e.target.value)}
					className='flex-grow p-2 border rounded-lg'
					placeholder="Ajouter un centre d'intérêt"
				/>
				<Button
					type='button'
					onClick={handleAddInterest}
					className='px-4 py-2 text-white bg-green-500 rounded'
				>
					Ajouter
				</Button>
			</div>
		</div>
	);
};
