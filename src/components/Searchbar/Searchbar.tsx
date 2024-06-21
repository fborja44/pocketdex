import { useState } from 'react';
import BallIcon from '../../assets/sprites/ui/caught-ball.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBaseRoute } from '../../utils/path';

export interface SearchbarProps {
	handleSearch?: (searchTerm: string | number) => void;
	placeholder?: string;
	device?: boolean;
}

const Searchbar = ({ handleSearch, placeholder, device }: SearchbarProps) => {
	const [searchTerm, setSearchTerm] = useState('');
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const search = () => {
		const baseRoute = getBaseRoute(pathname);
		navigate(`${baseRoute}/${searchTerm}`);
	};

	if (device) {
		return (
			<div className='container-row w-full bg-device-500 border-b-2 border-dex h-[24px] uppercase z-10'>
				<div className='text-sm text-dex px-2'>Search</div>
				<input
					className='px-2 h-full w-full bg-device-400 border-l-2 border-r-2 border-dex-dark outline-none text-sm placeholder:text-stone-500 text-stone-300 uppercase'
					placeholder={placeholder ?? 'Enter a term...'}
					value={searchTerm}
					onChange={(ev) => setSearchTerm(ev.target.value)}
				/>
				<button
					className='h-full container-center w-[30px] hover:brightness-75'
					onClick={handleSearch ? () => handleSearch(searchTerm) : search}
				>
					<img src={BallIcon} alt='Search' className='h-2 w-2' />
				</button>
				<span className='bg-device-200 h-[2px] w-full absolute top-[24px] z-10'></span>
			</div>
		);
	}

	return (
		<div className='container-row relative mb-2.5 w-full z-10'>
			<input
				className='bg-white w-full text-sm px-2 py-[1px] uppercase placeholder:text-gray-400 text-gray-600 border-b-2 border-r-2 border-twilight outline-none'
				placeholder={placeholder ?? 'Enter your search'}
				value={searchTerm}
				onChange={(ev) => setSearchTerm(ev.target.value)}
			/>
			<button
				className='container-center absolute top-1/2 -translate-y-1/2 right-1.5 hover:brightness-75 h-6 w-6'
				onClick={handleSearch ? () => handleSearch(searchTerm) : search}
			>
				<img src={BallIcon} alt='Search' className='h-2.5 w-2.5' />
			</button>
		</div>
	);
};

export default Searchbar;
