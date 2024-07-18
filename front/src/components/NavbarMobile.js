import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import LogoutDialog from '@/components/ui/LogoutDialog';
import { AiOutlineMenu } from 'react-icons/ai';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlus,
	faList,
	faSignInAlt,
	faUserPlus,
} from '@fortawesome/free-solid-svg-icons';

export default function NavBarMobile() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const router = useRouter();

	useEffect(() => {
		const token = sessionStorage.getItem('token');
		setIsAuthenticated(!!token);
	}, []);

	const handleLogout = () => {
		sessionStorage.removeItem('token');
		sessionStorage.removeItem('user_id');
		setIsAuthenticated(false);
		setIsDialogOpen(false);
		router.push('/login');
	};

	return (
		<div className='text-xl '>
			<Sheet>
				<SheetTrigger>
					<AiOutlineMenu className='text-4xl text-white' />
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetDescription className='py-2'>
							<ul className='w-64 my-10'>
								{isAuthenticated && (
									<li className='my-5'>
										<Link
											href='/create_event'
											className='flex items-center text-lg'
										>
											<FontAwesomeIcon icon={faPlus} className='mr-2' />
											Créer un événement
										</Link>
									</li>
								)}
								<li>
									<Link href='/contact' className='flex items-center text-lg'>
										<FontAwesomeIcon icon={faList} className='mr-2' />
										Voir tous les événements
									</Link>
								</li>
							</ul>
							<div className='flex items-center justify-center'>
								<div className='w-full max-w-screen-lg my-5 border-t-2 border-gray-200'></div>
							</div>
							<ul className='w-64 my-2'>
								{isAuthenticated ? (
									<>
										<li className='my-5'>
											<LogoutDialog
												isOpen={isDialogOpen}
												onOpenChange={setIsDialogOpen}
												onLogout={handleLogout}
											/>
										</li>
									</>
								) : (
									<>
										<li className='my-5'>
											<Link href='/login' className='flex items-center text-sm'>
												<FontAwesomeIcon icon={faSignInAlt} className='mr-2' />
												Se connecter
											</Link>
										</li>
										<li>
											<Link
												href='/register'
												className='flex items-center text-sm'
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
