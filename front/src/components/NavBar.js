import Link from 'next/link';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import NavBarDesk from './NavbarDesk';
import NavBarMobile from './NavbarMobile';
import { useLayoutEffect, useState } from "react";
import { useWindowSize } from "@uidotdev/usehooks";

export default function NavBar() {

	const size = useWindowSize();
	
	return (
		<nav className='absolute top-0 flex justify-between w-full p-4 bg-transparent'>
			<div className='container flex items-center justify-between mx-auto'>
				<div className='text-xl font-bold text-white'>
					<Link href='/'>PANGEA</Link>
				</div>
				{size.height>size.width?<NavBarMobile />:< NavBarDesk />}
				{/* <div className='flex w-1/4 space-x-4' >
					<NavigationMenu className='w-full'>
						<NavigationMenuList>
							<NavigationMenuItem >
								<NavigationMenuTrigger>Evénements</NavigationMenuTrigger>
								<NavigationMenuContent>
									<ul className='w-full sm:w-48'>
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
				</div> */}
			</div>
		</nav>
	);
}
