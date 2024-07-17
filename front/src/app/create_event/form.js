import React, { useState } from 'react';

function Form() {
    const [eventName, setEventName] = useState('');
    const [place, setPlace] = useState('');
    const [date, setDate] = useState('');
    const [eventType, setEventType] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');
    const [lien, setLien] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission logic here
        console.log({ eventName, place, date, eventType, number, price, image });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    return (
			<>
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
								<select
									className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									id='eventType'
									value={eventType}
									onChange={(e) => setEventType(e.target.value)}
									required
								>
									<option value=''>Sélectionnez un type d'événement</option>
									<option value='musique'>Musique</option>
									<option value='cuisine'>Cuisine</option>
									<option value='langues'>Langues</option>
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
								<input
									className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
									placeholder='Tags'
									type='text'
									id='tags'
									value={tags}
									onChange={(e) => setTags(e.target.value)}
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
						<button
							type='submit'
							className='px-6 py-3 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-#9898d7- focus:ring-opacity-50 bg-black hover:bg-gray-600'
						>
							CRÉER MON ÉVÉNEMENT
						</button>
					</form>
				</div>
			</>
		);
}

export default Form;
