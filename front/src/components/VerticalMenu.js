import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const items = ['LANGUES', 'MUSIQUE', 'CUISINE'];

const VerticalMenu = () => {
	const router = useRouter();
	const [selectedItem, setSelectedItem] = useState(null);

	const handleClick = (item) => {
		setSelectedItem(item);
		const path = `/${item.toLowerCase()}`;
		router.push(path);
	};

	return (
		<div className='bg-transparent'>
			<ul className='flex flex-col space-y-2'>
				{items.map((item, index) => (
					<li
						key={index}
						className={`relative mr-4 cursor-pointer hover:text-opacity-100 focus:font-bold ${
							selectedItem === item ? 'text-white font-bold' : ''
						}`}
						style={{
							writingMode: 'vertical-rl',
							textOrientation: 'mixed',
							color:
								selectedItem === item ? 'white' : 'rgba(255, 255, 255, 0.5)',
							transition: 'color 0.3s',
							marginBottom: '20px',
						}}
						onMouseEnter={(e) => {
							if (selectedItem !== item) {
								e.target.style.color = 'rgba(255, 255, 255, 1)';
							}
						}}
						onMouseLeave={(e) => {
							if (selectedItem !== item) {
								e.target.style.color = 'rgba(255, 255, 255, 0.5)';
							}
						}}
						onClick={() => handleClick(item)}
					>
						{item}
						{selectedItem === item && (
							<span className='absolute transform -translate-y-1/2 left-full'>
								<FontAwesomeIcon icon={faArrowRight} />
							</span>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};

export default VerticalMenu;
