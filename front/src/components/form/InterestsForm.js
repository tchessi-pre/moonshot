'use client';

import React, { useEffect } from 'react';
import useInterestStore from '@/stores/interestStore';

const InterestsForm = ({ interests, setInterests }) => {
	const fetchInterests = useInterestStore((state) => state.fetchInterests);
	const allInterests = useInterestStore((state) => state.allInterests);

	useEffect(() => {
		fetchInterests();
	}, [fetchInterests]);

	const handleInterestChange = (e) => {
		const options = e.target.options;
		const selectedInterests = [];
		for (let i = 0; i < options.length; i++) {
			if (options[i].selected) {
				selectedInterests.push(options[i].value);
			}
		}
		setInterests(selectedInterests);
	};

	if (!allInterests || allInterests.length === 0) {
		return (
			<div className='text-gray-600'>Chargement des centres d'intérêt...</div>
		);
	}

	return (
		<div>
			<label className='block mb-2 font-bold'>Centres d'intérêt</label>
			<select
				multiple
				value={interests}
				onChange={handleInterestChange}
				className='w-full p-2 border rounded-lg'
				style={{ height: '200px' }}
			>
				{allInterests.map((interest, index) => (
					<option key={index} value={interest} className='py-2'>
						{interest}
					</option>
				))}
			</select>
		</div>
	);
};

export default InterestsForm;
