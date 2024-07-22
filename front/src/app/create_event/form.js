import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent } from '../../services/eventService';
import { Button } from '@/components/ui/button';

function Form() {
	const router = useRouter();
	const [eventName, setEventName] = useState('');
	const [place, setPlace] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState(''); // New state for time
	const [eventType, setEventType] = useState('');
	const [number, setNumber] = useState('');
	const [price, setPrice] = useState('');
	const [lien, setLien] = useState('');
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setSuccess('');

		// Combine date and time
		const combinedDateTime = `${date}T${time}`;

		const eventData = {
			name: eventName,
			place,
			date: combinedDateTime, // Use combined date and time
			category: eventType,
			participant: number,
			price,
			link: lien,
			description,
			picture: image, // Assuming image is handled correctly in your backend
			user: sessionStorage.getItem('userId'), // Assuming the user ID is stored in sessionStorage
		};

		try {
			await createEvent(eventData);
			setSuccess('Événement créé avec succès!');
			setTimeout(() => {
				router.push('/events'); // Redirect to the events page or another appropriate page
			}, 2000);
		} catch (error) {
			setError("Erreur lors de la création de l'événement.");
		} finally {
			setLoading(false);
		}
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	return (
		<div className='flex flex-col items-center justify-center w-full max-w-2xl p-6 mx-2 my-8 rounded-lg'>
			<h1 className='my-4 text-3xl font-bold text-gray-800 uppercase'>
				CRÉER UN ÉVÉNEMENT
			</h1>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-center justify-center w-full space-y-4'
			>
				<div className='flex flex-wrap w-full space-y-4 md:space-y-0'>
					<div className='flex flex-col w-full px-2 space-y-4 md:w-1/2'>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Nom'
							type='text'
							id='eventName'
							value={eventName}
							onChange={(e) => setEventName(e.target.value)}
							required
						/>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Adresse'
							type='text'
							id='place'
							value={place}
							onChange={(e) => setPlace(e.target.value)}
							required
						/>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Date'
							type='date'
							id='date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
						/>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Heure'
							type='time'
							id='time'
							value={time}
							onChange={(e) => setTime(e.target.value)}
							required
						/>
						<select
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							id='eventType'
							value={eventType}
							onChange={(e) => setEventType(e.target.value)}
							required
						>
							<option value=''>Sélectionnez un type d'événement</option>
							<option value='Musique'>Musique</option>
							<option value='Cuisine'>Cuisine</option>
							<option value='Langues'>Langues</option>
						</select>
					</div>
					<div className='flex flex-col w-full px-2 space-y-4 md:w-1/2'>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Nombre de participants'
							type='number'
							id='number'
							value={number}
							onChange={(e) => setNumber(e.target.value)}
							required
						/>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Prix (si payant)'
							type='number'
							id='price'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
						/>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Lien'
							type='text'
							id='lien'
							value={lien}
							onChange={(e) => setLien(e.target.value)}
							required
						/>
					</div>
				</div>
				<div className='flex flex-wrap w-full space-y-4 md:space-y-0'>
					<div className='w-full px-2'>
						<textarea
							className='w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Description'
							id='description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</div>
					<div className='w-full px-2'>
						<input
							className='w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							type='file'
							id='image'
							onChange={handleImageChange}
							required
						/>
					</div>
				</div>
				{error && <div style={{ color: 'red' }}>{error}</div>}
				{success && <div style={{ color: 'green' }}>{success}</div>}
				{loading && <div style={{ color: 'blue' }}>Chargement...</div>}
				<button
					type='submit'
					className='px-6 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-#9898d7- focus:ring-opacity-50 bg-black hover:bg-gray-600'
					disabled={loading}
				>
					CRÉER MON ÉVÉNEMENT
				</button>
			</form>
		</div>
	);
}

export default Form;
