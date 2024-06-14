import BallIcon from '../../assets/sprites/ui/caught-ball.png';

const Searchbar = () => {
	return (
		<div className='container-row relative mb-4'>
			<input
				className='bg-white w-full px-3 py-0.5 text-lg uppercase placeholder:text-gray-300 border-b-2 border-r-2 border-twilight outline-none'
				placeholder='Enter your search'
			/>
			<button className='absolute top-1/2 -translate-y-1/2 right-3'>
				<img src={BallIcon} alt='Search' className='h-3 w-3' />
			</button>
		</div>
	);
};

export default Searchbar;
