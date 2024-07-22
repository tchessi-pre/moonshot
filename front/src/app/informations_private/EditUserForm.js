'use client';

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateCurrentUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import InterestsForm from '@/components/form/InterestsForm';
import { ProfilePictureForm } from '@/components/form/ProfilePictureForm';

const FormSection = ({ label, children }) => (
	<div className='w-full mb-4 md:w-2/3 lg:w-1/2'>
		<label className='block mb-2 font-bold'>{label}</label>
		{children}
	</div>
);

export const EditUserForm = ({ user, setUser, setIsEditing }) => {
	console.log('🚀 ~ EditUserForm ~ user:', user);
	const [formData, setFormData] = useState({
		id: user.id,
		username: user.username,
		firstname: user.firstname,
		lastname: user.lastname,
		email: user.email,
		location: user.location,
		birthdate: user.birthdate || '',
		biography: user.biography || '',
		interests: Array.isArray(user.interests)
			? user.interests.map((interest) => interest.id)
			: [], // Check if user.interests is an array
		avatar: user.avatar?.url || null,
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

	const handleAvatarChange = (file) => {
		setFormData((prevData) => ({
			...prevData,
			avatar: file,
		}));
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		console.log('Form data being sent:', formData);
		try {
			const updatedUser = await updateCurrentUser(formData);
			console.log('Response from server:', updatedUser);
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
		<form
			onSubmit={handleFormSubmit}
			className='flex flex-col items-center mt-4 space-y-6'
		>
			<FormSection>
				<ProfilePictureForm
					profilePicture={formData.avatar}
					setProfilePicture={handleAvatarChange}
				/>
			</FormSection>
			<FormSection label="Nom d'utilisateur">
				<input
					type='text'
					name='username'
					value={formData.username}
					onChange={handleInputChange}
					className='w-full p-2 border rounded-lg'
					required
				/>
			</FormSection>
			<FormSection label='Prénom'>
				<input
					type='text'
					name='firstname'
					value={formData.firstname}
					onChange={handleInputChange}
					className='w-full p-2 border rounded-lg'
					required
				/>
			</FormSection>
			<FormSection label='Nom'>
				<input
					type='text'
					name='lastname'
					value={formData.lastname}
					onChange={handleInputChange}
					className='w-full p-2 border rounded-lg'
					required
				/>
			</FormSection>
			<FormSection label='Email'>
				<input
					type='email'
					name='email'
					value={formData.email}
					onChange={handleInputChange}
					className='w-full p-2 border rounded-lg'
					required
				/>
			</FormSection>
			<FormSection label='Localisation'>
				<input
					type='text'
					name='location'
					value={formData.location}
					onChange={handleInputChange}
					className='w-full p-2 border rounded-lg'
					required
				/>
			</FormSection>
			<FormSection label='Date de naissance'>
				<input
					type='date'
					name='birthdate'
					value={formData.birthdate.split('T')[0]}
					onChange={handleInputChange}
					className='w-full p-2 border rounded-lg'
					required
				/>
			</FormSection>
			<FormSection label='Biographie'>
				<div className='p-2 bg-white rounded-lg'>
					<ReactQuill
						value={formData.biography}
						onChange={handleQuillChange}
						className='mt-1'
					/>
				</div>
			</FormSection>
			<FormSection>
				<InterestsForm
					interests={formData.interests}
					setInterests={(newInterests) =>
						setFormData((prevData) => ({
							...prevData,
							interests: newInterests,
						}))
					}
				/>
			</FormSection>
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

export default EditUserForm;
