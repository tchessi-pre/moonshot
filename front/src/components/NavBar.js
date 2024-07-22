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
		<nav className='fixed top-0 flex justify-between w-full p-4 bg-transparent'>
			<div className='container flex items-center justify-between mx-auto'>
				<div className='text-xl font-bold text-white'>
					<Link href='/'>PANGEA</Link>
				</div>
				{size.height>size.width?<NavBarMobile />:< NavBarDesk />}
			</div>
		</nav>
	);
}
