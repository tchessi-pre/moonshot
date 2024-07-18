import Link from 'next/link';


export default function NavBarLogin() {
    return (
        <nav className='absolute top-0 flex justify-between w-full p-4 bg-transparent'>
            <div className='container flex items-center justify-between mx-auto'>
                <div className='text-xl font-bold text-white'>
                    <Link href='/'>PANGEA</Link>
                </div>
            </div>
        </nav>
    );
}



	
	