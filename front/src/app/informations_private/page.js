import React from 'react';
// import './style.css';
import Form from './Form';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"


export default function Login() {
	return (
		<main
			className='relative flex flex-col items-center justify-center h-fit bg-center bg-cover'
			style={{ backgroundImage: "url('/assets/bground.jpg')" }}
		>
            <div>
                <span>
                    John Doe
                </span>
            </div>
            <div>
                <Button type='submit' className='w-full mt-6'>
					Modifier informations générales
				</Button>
            </div>
            <div>
                <span>
                    Parle: Anglais, Italien, Français
                </span>
            </div>
            <div>
                <span>
                    Marseille, France
                </span>
            </div>

			<div className='flex items-center justify-center min-h-screen mx-2'>
				<Form/>
			</div>
            <div className='flex items-center justify-center min-h-screen mx-2'>
                <span>Langues parlées :</span>
                <Badge variant="secondary">Secondary</Badge> 
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="secondary">Secondary</Badge>
			</div>
		</main>
	);
}