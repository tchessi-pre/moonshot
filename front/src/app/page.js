import Image from 'next/image';
import NavBar from '../components/NavBar';

export default function Home() {
	return (
		<main
			className='relative flex flex-col items-center justify-center min-h-screen bg-center bg-cover'
			style={{ backgroundImage: "url('/assets/bground.jpg')" }}
		>
			<NavBar />
			<div className='p-8 mt-20 text-center text-white bg-black bg-opacity-0 rounded-lg'>
				<div className='flex items-center justify-center'>
					<Image
						src='/assets/circle-center.png' 
						alt='Your Image Description'
						width={500} 
						height={500} 
						className='rounded-full' 
					/>
				</div>
			</div>
		</main>
	);
}
