'use client';

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateCurrentUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { InterestsForm } from '@/components/form/InterestsForm';
import { ProfilePictureForm } from '@/components/form/ProfilePictureForm';

export const EditUserForm = ({ user, setUser, setIsEditing }) => {
	const [formData, setFormData] = useState({
		id: user.id,
		username: user.username, // Ajoutez le champ username ici
		firstname: user.firstname,
		lastname: user.lastname,
		email: user.email,
		location: user.location,
		birthdate: user.birthdate || '',
		biography: user.biography || '',
		interests: user.interests || [],
		avatar: user.avatar || '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			[name]: value,
		}));
	};

	const handleQuillChange = (content) => {
		setFormData((prevData) => ({
			...prevData,
			biography: content,
		}));
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		console.log('Form data being sent:', formData);
		try {
			const updatedUser = await updateCurrentUser(formData);
			setUser(updatedUser);
			toast.success('Informations mises à jour avec succès!');
			setIsEditing(false);
		} catch (error) {
			console.error(
				'Error updating user:',
				error.response?.data || error.message
			);
			toast.error(
				error.response?.data?.message ||
					'Erreur lors de la mise à jour des données utilisateur'
			);
		}
	};


	return (
		<form onSubmit={handleFormSubmit} className='mt-4 space-y-4'>
			<ProfilePictureForm
				profilePicture={formData.avatar}
				setProfilePicture={(file) =>
					setFormData((prevData) => ({
						...prevData,
						avatar: file,
					}))
				}
			/>
			<div>
				<label className='block font-bold'>Nom d'utilisateur: </label>
				<input
					type='text'
					name='username'
					value={formData.username}
					onChange={handleInputChange}
					className='w-full p-2 mt-1 border rounded-lg'
					required
				/>
			</div>
			<div>
				<label className='block font-bold'>Prénom: </label>
				<input
					type='text'
					name='firstname'
					value={formData.firstname}
					onChange={handleInputChange}
					className='w-full p-2 mt-1 border rounded-lg'
					required
				/>
			</div>
			<div>
				<label className='block font-bold'>Nom: </label>
				<input
					type='text'
					name='lastname'
					value={formData.lastname}
					onChange={handleInputChange}
					className='w-full p-2 mt-1 border rounded-lg'
					required
				/>
			</div>
			<div>
				<label className='block font-bold'>Email: </label>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleInputChange}
					className='w-full p-2 mt-1 border rounded-lg'
					required
				/>
			</div>
			<div>
				<label className='block font-bold'>Localisation: </label>
				<input
					type='text'
					name='location'
					value={formData.location}
					onChange={handleInputChange}
					className='w-full p-2 mt-1 border rounded-lg'
					required
				/>
			</div>
			<div>
				<label className='block font-bold'>Date de naissance: </label>
				<input
					type='date'
					name='birthdate'
					value={formData.birthdate.split('T')[0]}
					onChange={handleInputChange}
					className='w-full p-2 mt-1 border rounded-lg'
					required
				/>
			</div>
			<div className='p-2 bg-white rounded-lg'>
				<label className='block font-bold'>Biographie: </label>
				<ReactQuill
					value={formData.biography}
					onChange={handleQuillChange}
					className='mt-1'
				/>
			</div>
			<InterestsForm
				interests={formData.interests}
				setInterests={(newInterests) =>
					setFormData((prevData) => ({
						...prevData,
						interests: newInterests,
					}))
				}
			/>
			<div className='flex space-x-4'>
				<Button
					type='submit'
					className='px-4 py-2 text-white bg-blue-500 rounded'
				>
					Enregistrer
				</Button>
				<Button
					type='button'
					className='px-4 py-2 text-white bg-gray-500 rounded'
					onClick={() => setIsEditing(false)}
				>
					Annuler
				</Button>
			</div>
		</form>
	);
};
