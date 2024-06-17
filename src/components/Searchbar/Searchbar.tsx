import { useState } from 'react';
import BallIcon from '../../assets/sprites/ui/caught-ball.png';

const Searchbar = () => {
	const [searchTerm, setSearchTerm] = useState('');

	return (
		<div className='container-row relative mb-2.5'>
			<input
				className='bg-white w-full text-md px-2 py-[2px] uppercase placeholder:text-gray-300 text-gray-700 border-b-2 border-r-2 border-twilight outline-none'
				placeholder='Enter your search'
				value={searchTerm}
				onChange={(ev) => setSearchTerm(ev.target.value)}
			/>
			<button className='absolute top-1/2 -translate-y-1/2 right-3'>
				<img src={BallIcon} alt='Search' className='h-2.5 w-2.5' />
			</button>
		</div>
	);
};

export default Searchbar;
