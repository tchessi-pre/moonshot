import Link from 'next/link';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"

import { AiOutlineMenu } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";

export default function NavBarMobile() {
	return (

		<div className='flex space-x-4 my-5 px-5  w-1/4 text-xl' >
            <Sheet>
            <SheetTrigger><AiOutlineMenu className="text-4xl text-white mt-2"/></SheetTrigger>
            <SheetContent>
                <SheetHeader>
                {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
                <SheetDescription className='py-10'>
                <ul className='w-64 my-10'>
                                                    <li className='my-5'>
                                                <Link href='/services' className="text-lg"> 
                                                    Créer un événements
                                                </Link>
                                                    </li>
                                                    <li>
                                                <Link href='/contact' className="text-lg">
                                                    Voir tous les événements
                                                </Link>
                                                    </li>
                    </ul>
                    <div class="flex justify-center items-center">
                        <div class="w-full max-w-screen-lg border-t-2 border-gray-500 my-5"></div>
                    </div>
                    <ul className='w-64 my-10'>
                                            <li className='my-5'>
                                                <Link href='/login' className="text-lg">
                                                    Se connecter
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="text-lg" href='/register' >
                                                    S'inscrire
                                                </Link>
                                            </li>
                    </ul>
                </SheetDescription>
                </SheetHeader>
            </SheetContent>
            </Sheet>
	    </div>

	);
}
