import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateCurrentUser } from '../../services/userService';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import InterestsForm from '@/components/form/InterestsForm';
import { ProfilePictureForm } from '@/components/form/ProfilePictureForm';

const FormSection = ({ label, children, fullWidth }) => (
	<div className={`w-full mb-4 ${fullWidth ? 'lg:w-full' : 'lg:w-1/2 px-2'}`}>
		<label className='block mb-2 font-bold'>{label}</label>
		{children}
	</div>
);

export const EditUserForm = ({ user, setUser, setIsEditing }) => {
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
			: [],
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
		try {
			const updatedUser = await updateCurrentUser(formData);
			setUser(updatedUser);
			toast.success('Informations mises à jour avec succès!');
			setIsEditing(false);
		} catch (error) {
			toast.error(
				error.response?.data?.message ||
					'Erreur lors de la mise à jour des données utilisateur'
			);
		}
	};

	return (
		<form onSubmit={handleFormSubmit} className='w-full p-4 rounded-lg'>
			<div className='flex flex-wrap -mx-2'>
				<FormSection fullWidth>
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
					/>
				</FormSection>
				<FormSection label='Prénom'>
					<input
						type='text'
						name='firstname'
						value={formData.firstname}
						onChange={handleInputChange}
						className='w-full p-2 border rounded-lg'
					/>
				</FormSection>
				<FormSection label='Nom'>
					<input
						type='text'
						name='lastname'
						value={formData.lastname}
						onChange={handleInputChange}
						className='w-full p-2 border rounded-lg'
					/>
				</FormSection>
				<FormSection label='Email'>
					<input
						type='email'
						name='email'
						value={formData.email}
						onChange={handleInputChange}
						className='w-full p-2 border rounded-lg'
						disabled
					/>
				</FormSection>
				<FormSection label='Localisation'>
					<input
						type='text'
						name='location'
						value={formData.location}
						onChange={handleInputChange}
						className='w-full p-2 border rounded-lg'
					/>
				</FormSection>
				<FormSection label='Date de naissance'>
					<input
						type='date'
						name='birthdate'
						value={formData.birthdate.split('T')[0]}
						onChange={handleInputChange}
						className='w-full p-2 border rounded-lg'
						disabled
					/>
				</FormSection>
				<FormSection label='Biographie' fullWidth>
					<div className='p-2 bg-white rounded-lg'>
						<ReactQuill
							value={formData.biography}
							onChange={handleQuillChange}
							className='mt-1'
						/>
					</div>
				</FormSection>
				<FormSection fullWidth>
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
			</div>
			<div className='flex justify-end mt-4 space-x-4'>
				<Button
					type='submit'
					className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600'
				>
					Enregistrer
				</Button>
				<Button
					type='button'
					className='px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600'
					onClick={() => setIsEditing(false)}
				>
					Annuler
				</Button>
			</div>
		</form>
	);
};

export default EditUserForm;
