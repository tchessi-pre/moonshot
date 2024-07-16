import React from 'react';
import { useRouter } from 'next/navigation';

const items = ['LINGUISTIQUE', 'MUSIQUE', 'CUISINE'];

const VerticalMenu = () => {
	const router = useRouter();

	const handleClick = (item) => {
		const path = `/${item.toLowerCase()}`;
		router.push(path);
	};

	return (
		<div className='bg-transparent'>
			<ul className='flex flex-col space-y-2'>
				{items.map((item, index) => (
					<li
						key={index}
						className='mr-4 cursor-pointer hover:text-opacity-100 hover:font-bold'
						style={{
							writingMode: 'vertical-rl',
							textOrientation: 'mixed',
							color: 'rgba(255, 255, 255, 0.5)',
							transition: 'color 0.3s',
							marginBottom: '20px',
						}}
						onMouseEnter={(e) =>
							(e.target.style.color = 'rgba(255, 255, 255, 1)')
						}
						onMouseLeave={(e) =>
							(e.target.style.color = 'rgba(255, 255, 255, 0.5)')
						}
						onClick={() => handleClick(item)}
					>
						{item}
					</li>
				))}
			</ul>
		</div>
	);
};

export default VerticalMenu;
