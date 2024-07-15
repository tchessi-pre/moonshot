import React from 'react';
// import './style.css';
import Form from './Form';
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"


export default function Login() {
	return (
		<main
			className='relative flex flex-col items-center justify-center min-h-screen bg-center '
			style={{ backgroundImage: "url('/assets/bground.jpg')" }}
		>
            <div className="bg-cover bg-white bg-opacity-50 p-10 rounded-lg m-10">
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
                    Localisation: Marseille, France
                    </span>
                </div>

                <div className='flex items-center justify-center mx-2'>
                    <Form/>
                </div>
                <div className='flex items-center justify-center  mx-2'>
                    <span>Langues parlées :</span>
                    <Badge variant="secondary">Anglais</Badge> 
                    <Badge variant="secondary">Italien</Badge>
                    <Badge variant="secondary">Français</Badge>
                </div>
            </div>
		</main>
	);
}