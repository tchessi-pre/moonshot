'use client';
import React, { useState } from 'react';
// import './style.css';
import Form from './Form';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Toggle } from '@/components/ui/toggle';
import { ImLocation } from 'react-icons/im';
import NavBar from '../../components/NavBar';

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

export default function InfoProfil() {
	// const [showMe, setShowMe] = useState(false);
	// function toggle(){
	//     setShowMe(!showMe);
	//   }

	return (
		<main
			className='relative flex flex-col items-start justify-center min-h-screen bg-center bg-cover'
			style={{ backgroundImage: "url('/assets/bground.jpg')" }}
		>
			<NavBar />
			<div className='p-10 bg-opacity-50 bg-cover rounded-lg bg-orange-50 sm:h-screen sm:w-3/5'>
				<div className='p-5'>
					<svg height='200' width='200'>
						<circle cx='80' cy='100' r='80' fill='grey' />
					</svg>
					<span className='p-8 font-bold tracking-wide uppercase'>
						John Doe
					</span>
				</div>

				<Dialog>
					<DialogTrigger className='w-full my-6 sm:w-1/2'>
						<Button>Modifier informations générales</Button>
					</DialogTrigger>
					<DialogContent aria-describedby='formulaire'>
						<Form />
					</DialogContent>
				</Dialog>

				<div className='p-2'>
					<span className='font-bold'>
						Parle:
						<span className='mx-2 text-slate-500'>Anglais</span>
						<span className='mx-2 text-slate-500'>Italien</span>
						<span className='mx-2 text-slate-500'>Français</span>
					</span>
				</div>
				<div className='flex p-2 font-bold'>
					<span>
						<ImLocation />
					</span>
					<span className='mx-2'> Localisation: </span>
					<span className='mx-2'>Marseille, France</span>
				</div>

				{/* <div className='flex items-center justify-center mx-2' style={{
                    display: showMe?"block":"none"
                }}>
                    <Form />  
                </div> */}
				<div className='flex flex-wrap items-center justify-start mx-2'>
					<span className='font-bold'>Langues parlées :</span>
					<Badge variant='secondary' className='m-1'>
						<span>Anglais</span>
						<button
							type='button'
							className='inline-flex items-center p-1 text-sm bg-transparent rounded-sm ms-2 text-black-400 hover:bg-black-200 hover:text-black-900 dark:hover:bg-dark-800 dark:hover:text-blue-300'
							data-dismiss-target='#badge-dismiss-default'
							aria-label='Remove'
						>
							X
						</button>
					</Badge>
					<Badge variant='secondary' className='m-1'>
						<span>Italien</span>
						<button
							type='button'
							className='inline-flex items-center p-1 text-sm bg-transparent rounded-sm ms-2 text-black-400 hover:bg-black-200 hover:text-black-900 dark:hover:bg-dark-800 dark:hover:text-blue-300'
							data-dismiss-target='#badge-dismiss-default'
							aria-label='Remove'
						>
							X
						</button>
					</Badge>
					<Badge variant='secondary' className='m-1'>
						<span>Français</span>
						<button
							type='button'
							className='inline-flex items-center p-1 text-sm bg-transparent rounded-sm ms-2 text-black-400 hover:bg-black-200 hover:text-black-900 dark:hover:bg-dark-800 dark:hover:text-blue-300'
							data-dismiss-target='#badge-dismiss-default'
							aria-label='Remove'
						>
							X
						</button>
					</Badge>
				</div>
			</div>
		</main>
	);
}
