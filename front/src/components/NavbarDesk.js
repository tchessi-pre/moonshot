'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus,
	faList,
	faUser,
	faSignInAlt,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import LogoutDialog from '@/components/ui/LogoutDialog';
import useAuthStore from '@/stores/authStore';

export default function NavBarDesk() {
	const { token, user, setAuthData, clearAuthData } = useAuthStore();
	const [isDialogOpen, setIsDialogOpen] = React.useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		const userId = sessionStorage.getItem('userId');
		if (token && userId) {
			setAuthData(token, userId, user);
		}
	}, [setAuthData, user]);

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('userId');
		clearAuthData();
		setIsDialogOpen(false);
		router.push('/login');
	};

	const isAuthenticated = !!token;

	return (
		<div className='flex w-1/4 space-x-4'>
			<NavigationMenu className='w-full'>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>Evénements</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='w-full sm:w-48'>
								{isAuthenticated && (
									<li className='my-2'>
										<NavigationMenuLink href='/create_event'>
											<FontAwesomeIcon icon={faPlus} className='mr-2' />
											Créer un événement
										</NavigationMenuLink>
									</li>
								)}
								<li>
									<NavigationMenuLink href='/events'>
										<FontAwesomeIcon icon={faList} className='mr-2' />
										Tous les événements
									</NavigationMenuLink>
								</li>
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
			<NavigationMenu className='w-full'>
				<NavigationMenuList>
					<NavigationMenuItem>
						<NavigationMenuTrigger>
							{isAuthenticated ? user?.username || 'Compte' : 'Connexion'}
						</NavigationMenuTrigger>
						<NavigationMenuContent>
							<ul className='w-36'>
								{isAuthenticated ? (
									<>
										<li className='my-2'>
											<Link
												href='/informations_private'
												className='w-full text-md left text-'
											>
												<FontAwesomeIcon icon={faUser} className='mr-2' />
												Mon compte
											</Link>
										</li>
										<li className='my-2'>
											<LogoutDialog
												isOpen={isDialogOpen}
												onOpenChange={setIsDialogOpen}
												onLogout={handleLogout}
											/>
										</li>
									</>
								) : (
									<>
										<li className='my-2'>
											<NavigationMenuLink href='/login'>
												<FontAwesomeIcon icon={faSignInAlt} className='mr-2' />
												Se connecter
											</NavigationMenuLink>
										</li>
										<li>
											<NavigationMenuLink className='w-full' href='/register'>
												<FontAwesomeIcon icon={faUserPlus} className='mr-2' />
												S'inscrire
											</NavigationMenuLink>
										</li>
									</>
								)}
							</ul>
						</NavigationMenuContent>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
}
