import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import SearchBar from '@/components/ui/SearchBar';

export default function NavBar() {
	return (
		<nav className='absolute top-0 flex justify-between w-full p-4 bg-transparent'>
			<div className='container flex items-center justify-between mx-auto'>
				<div className='text-xl font-bold text-white'>
					<Link href='/'>PANGEA</Link>
				</div>
				<div className='flex space-x-4'>
				<SearchBar /> {SearchBar}
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Evénements</NavigationMenuTrigger>
								<NavigationMenuContent>
									<NavigationMenuLink href='/services'>
										Créer un événements
									</NavigationMenuLink>
									<NavigationMenuLink href='/contact'>
										Voir tous les événements
									</NavigationMenuLink>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
					<NavigationMenu>
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger>Connexion</NavigationMenuTrigger>
								<NavigationMenuContent>
									<NavigationMenuLink href='/login'>
										Se connecter
									</NavigationMenuLink>
									<NavigationMenuLink href='/register'>
										S'inscrire
									</NavigationMenuLink>
								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
			</div>
		</nav>
	);
}
