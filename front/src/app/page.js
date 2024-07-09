import Image from 'next/image';
import NavBar from '../components/NavBar';

export default function Home() {
	return (
		<main
			className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
			style={{ backgroundImage: "url('/assets/bground.jpg')" }}
		>
			<NavBar />
			<div className='p-8 mt-20 text-center text-white bg-black bg-opacity-50 rounded-lg'>
				<h1 className='mb-4 text-4xl font-bold'>
					Bienvenue sur ma Pangéa
				</h1>
				<p className='text-lg'>
					Page d'accueil 
				</p>
			</div>
		</main>
	);
}
