import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent } from '../../services/eventService';
import { Button } from '@/components/ui/button';

function Form() {
	const router = useRouter();
	const [eventName, setEventName] = useState('');
	const [place, setPlace] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
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

		const eventData = new FormData();
		eventData.append(
			'data',
			JSON.stringify({
				name: eventName,
				place,
				date: `${date}T${time}`,
				category: eventType,
				participant: number,
				price,
				link: lien,
				description,
				user: sessionStorage.getItem('userId'),
			})
		);

		if (image) {
			eventData.append('files.picture', image);
		}

		try {
			await createEvent(eventData);
			setSuccess('Événement créé avec succès!');
			setTimeout(() => {
				router.push('/events');
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
		<div className='flex flex-col items-center justify-center w-full max-w-2xl p-8 mx-auto my-8 bg-white rounded-lg shadow-lg'>
			<h1 className='my-4 text-3xl font-bold text-gray-800 uppercase'>
				CRÉER UN ÉVÉNEMENT
			</h1>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col items-center justify-center w-full space-y-6'
			>
				<div className='grid w-full grid-cols-1 gap-6 md:grid-cols-2'>
					<div className='flex flex-col'>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Nom'
							type='text'
							id='eventName'
							value={eventName}
							onChange={(e) => setEventName(e.target.value)}
							required
						/>
					</div>
					<div className='flex flex-col'>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Adresse'
							type='text'
							id='place'
							value={place}
							onChange={(e) => setPlace(e.target.value)}
							required
						/>
					</div>
					<div className='flex flex-col'>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Date'
							type='date'
							id='date'
							value={date}
							onChange={(e) => setDate(e.target.value)}
							required
						/>
					</div>
					<div className='flex flex-col'>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Heure'
							type='time'
							id='time'
							value={time}
							onChange={(e) => setTime(e.target.value)}
							required
						/>
					</div>
					<div className='flex flex-col'>
						<select
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							id='eventType'
							value={eventType}
							onChange={(e) => setEventType(e.target.value)}
							required
						>
							<option value=''>Catégorie d'événement</option>
							<option value='Musique'>Musique</option>
							<option value='Cuisine'>Cuisine</option>
							<option value='Langues'>Langues</option>
						</select>
					</div>
					<div className='flex flex-col'>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Nombre de participants'
							type='number'
							id='number'
							value={number}
							onChange={(e) => setNumber(e.target.value)}
							required
						/>
					</div>
					<div className='flex flex-col'>
						<input
							className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
							placeholder='Prix (si payant)'
							type='number'
							id='price'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
						/>
					</div>
					<div className='flex flex-col'>
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
				<div className='w-full'>
					<textarea
						className='w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						placeholder='Description'
						id='description'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div className='w-full'>
					<input
						className='w-full p-3 mt-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
						type='file'
						id='image'
						onChange={handleImageChange}
						required
					/>
				</div>
				{error && <div className='text-red-500'>{error}</div>}
				{success && <div className='text-green-500'>{success}</div>}
				{loading && <div className='text-blue-500'>Chargement...</div>}
				<Button
					type='submit'
					className='w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
					disabled={loading}
				>
					CRÉER MON ÉVÉNEMENT
				</Button>
			</form>
		</div>
	);
}

export default Form;
