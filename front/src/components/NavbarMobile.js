'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTrigger,
} from '@/components/ui/sheet';
import LogoutDialog from '@/components/ui/LogoutDialog';
import { AiOutlineMenu } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus,
	faList,
	faSignInAlt,
	faUser,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '@/stores/authStore';

export default function NavBarMobile() {
	const { token, setAuthData, clearAuthData } = useAuthStore();
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		const userId = sessionStorage.getItem('userId');
		if (token && userId) {
			setAuthData(token, userId, null);
		}
	}, [setAuthData]);

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('userId');
		clearAuthData();
		setIsDialogOpen(false);
		router.push('/login');
	};

	const isAuthenticated = !!token;

	return (
		<div className='text-xl'>
			<Sheet>
				<SheetTrigger>
					<div className='flex items-center'>
						<AiOutlineMenu className='text-4xl text-white' />
					</div>
				</SheetTrigger>
				<SheetContent className='text-white bg-white'>
					<SheetHeader className='border-b border-gray-700'>
						<SheetDescription className='py-4'>
							<ul className='w-full'>
								{isAuthenticated && (
									<li className='my-3'>
										<Link
											href='/create_event'
											className='flex items-center text-lg'
										>
											<FontAwesomeIcon icon={faPlus} className='mr-2' />
											Créer un événement
										</Link>
									</li>
								)}
								<li className='my-3'>
									<Link href='/events' className='flex items-center text-lg'>
										<FontAwesomeIcon icon={faList} className='mr-2' />
										Voir tous les événements
									</Link>
								</li>
							</ul>
							<div className='my-5 border-t border-gray-700'></div>
							<ul className='w-full'>
								{isAuthenticated && (
									<li className='my-3'>
										<Link
											href='/articles/create'
											className='flex items-center text-lg'
										>
											<FontAwesomeIcon icon={faPlus} className='mr-2' />
											Créer un article
										</Link>
									</li>
								)}
								<li className='my-3'>
									<Link href='/articles' className='flex items-center text-lg'>
										<FontAwesomeIcon icon={faList} className='mr-2' />
										Voir tous les articles
									</Link>
								</li>
							</ul>
							<div className='my-5 border-t border-gray-700'></div>
							<ul className='w-full'>
								{isAuthenticated ? (
									<>
										<li className='my-3'>
											<Link
												href='/informations_private'
												className='flex items-center text-lg'
											>
												<FontAwesomeIcon icon={faUser} className='mr-2' />
												Mon compte
											</Link>
										</li>
										<li className='my-3'>
											<LogoutDialog
												isOpen={isDialogOpen}
												onOpenChange={setIsDialogOpen}
												onLogout={handleLogout}
											/>
										</li>
									</>
								) : (
									<>
										<li className='my-3'>
											<Link href='/login' className='flex items-center text-lg'>
												<FontAwesomeIcon icon={faSignInAlt} className='mr-2' />
												Se connecter
											</Link>
										</li>
										<li className='my-3'>
											<Link
												href='/register'
												className='flex items-center text-lg'
											>
												<FontAwesomeIcon icon={faUserPlus} className='mr-2' />
												S'inscrire
											</Link>
										</li>
									</>
								)}
							</ul>
						</SheetDescription>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</div>
	);
}
