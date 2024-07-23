'use client';

import React, { useState, useEffect } from 'react';
import { fetchInterests } from '../../services/interestService';

const InterestsForm = ({ interests, setInterests }) => {
	const [allInterests, setAllInterests] = useState([]);

	useEffect(() => {
		const loadInterests = async () => {
			try {
				const interestsData = await fetchInterests();
				if (interestsData.data && Array.isArray(interestsData.data)) {
					const interestList = interestsData.data.map(
						(item) => item.attributes.name
					);
					setAllInterests(interestList);
				}
			} catch (error) {
				console.error(
					"Erreur lors de la récupération des centres d'intérêt",
					error
				);
			}
		};

		loadInterests();
	}, []);

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

	if (!Array.isArray(allInterests)) {
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
				className='w-full p-2 border ro unded-lg'
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
