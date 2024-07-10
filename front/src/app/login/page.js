"use client";

import React, { useState } from 'react';
import './style.css';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
	<main
	className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
	style={{ backgroundImage: "url('/assets/bground.jpg')" }}
>
		<div className='flex items-center justify-center min-h-screen mx-2'>
			<form onSubmit={handleSubmit} className='flex flex-col items-center justify-center  w-full max-w-md'>
			<span className='text-white uppercase font-bold text-xl'>Connexion</span>

				<div>
					<input className='p-2 my-5 rounded-lg'
						type='email'
						id='email'
						placeholder ='Email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div >
					<input className='p-2 my-5 rounded-lg'
						type='password'
						placeholder='Mot de passe'
						id='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<div className="my-3">
					<p className ="text-white">
						Pas encore inscrit ? <a className ="font-bold" href='/register'>S'inscrire</a>
					</p>
				</div>
				<Button>Se connecter</Button>
			</form>
		</div>
		</main>
	);
}