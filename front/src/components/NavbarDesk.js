import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

export default function NavBarDesk() {
	return (

				<div className='flex space-x-4 w-1/4' >
					<NavigationMenu className='w-full'>
						<NavigationMenuList>
							<NavigationMenuItem >
								<NavigationMenuTrigger>Evénements</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className='sm:w-48 w-full'>
										<li className='my-2'>
									<NavigationMenuLink href='/services'> 
										Créer un événements
									</NavigationMenuLink>
										</li>
										<li>
									<NavigationMenuLink href='/contact'>
										Voir tous les événements
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
								<NavigationMenuTrigger>Connexion</NavigationMenuTrigger>
								<NavigationMenuContent>
								<ul className='w-36'>
										<li className='my-2'>

									<NavigationMenuLink href='/login'>
										Se connecter
									</NavigationMenuLink>
										</li>
										<li>
									<NavigationMenuLink className="w-full" href='/register'>
										S'inscrire
									</NavigationMenuLink>
										</li>
									</ul>


								</NavigationMenuContent>
							</NavigationMenuItem>
						</NavigationMenuList>
					</NavigationMenu>
				</div>

	);
}
