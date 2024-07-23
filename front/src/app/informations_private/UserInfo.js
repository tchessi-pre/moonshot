'use client';

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@/components/ui/button';
import { EditUserForm } from './EditUserForm';
import ProfilePictureDisplay from '@/components/ProfilePictureDisplay';
import useUserStore from '@/stores/userStore';

const extractTextFromBiography = (biography) => {
	if (!biography || !Array.isArray(biography)) {
		return '';
	}
	return biography
		.map((block) => block.children.map((child) => child.text).join(' '))
		.join('<br />');
};

export default function UserInfo() {
	const fetchCurrentUser = useUserStore((state) => state.fetchCurrentUser);
	const user = useUserStore((state) => state.currentUser);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const getUserData = async () => {
			try {
				const data = await fetchCurrentUser();
				data.biographyText = extractTextFromBiography(data.Biography);
			} catch (error) {
				console.error(error.message);
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		getUserData();
	}, [fetchCurrentUser]);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	if (loading) {
		return <div className='text-blue-500'>Chargement...</div>;
	}

	if (!user) {
		return (
			<div className='text-red-500'>
				Erreur lors de la récupération des données utilisateur.
			</div>
		);
	}

	console.log('Avatar URL:', user.avatar?.url);

	return (
		<div className='p-10 mt-16 mb-4 bg-opacity-50 bg-cover rounded-lg bg-orange-50 sm:h-full sm:w-3/5 '>
			{isEditing ? (
				<EditUserForm
					user={user}
					setUser={(updatedUser) => {
						user.biographyText = extractTextFromBiography(
							updatedUser.Biography
						);
						setUser(updatedUser);
					}}
					setIsEditing={setIsEditing}
				/>
			) : (
				<>
					<ProfilePictureDisplay profilePicture={user.avatar} />
					<div className='mt-6 space-y-4'>
						<div className='text-lg font-bold uppercase'>
							{user.firstname} {user.lastname}
						</div>
						<div>
							<span className='font-bold'>Email: </span>
							<span>{user.email}</span>
						</div>
						<div>
							<span className='font-bold'>Localisation: </span>
							<span>{user.location}</span>
						</div>
						<div>
							<span className='font-bold'>Date de naissance: </span>
							<span>{new Date(user.birthdate).toLocaleDateString()}</span>
						</div>
						<div>
							<span className='font-bold'>Biographie: </span>
							<div className='mt-2'>
								<div dangerouslySetInnerHTML={{ __html: user.biographyText }} />
							</div>
						</div>
						<div>
							<span className='font-bold'>Centres d'intérêt: </span>
							<div className='flex flex-wrap gap-2 mt-2'>
								{Array.isArray(user.interests) && user.interests.length > 0 ? (
									user.interests.map((interest, index) => (
										<div key={index} className='flex items-center space-x-2'>
											<span className='inline-block px-2 py-1 text-white bg-gray-700 rounded-lg'>
												{interest.name}
											</span>
										</div>
									))
								) : (
									<span className='text-gray-500'>
										Aucun centre d'intérêt trouvé
									</span>
								)}
							</div>
						</div>
					</div>
					<Button
						className='px-4 py-2 mt-6 text-white bg-blue-500 rounded-lg'
						onClick={handleEditClick}
					>
						Modifier informations générales
					</Button>
				</>
			)}
			<ToastContainer />
		</div>
	);
}
