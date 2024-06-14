import Searchbar from '../components/Searchbar/Searchbar';
import TypeBackground from '../components/TypeBackground/TypeBackground';
import LeftArrow from '../assets/sprites/ui/left-arrow.png';
import RightArrow from '../assets/sprites/ui/right-arrow.png';
import useFetch from '../hooks/useFetch';

const Species = () => {
	const { data, loading, error } = useFetch('pokemon');

	if (loading) {
		return null;
	}

	if (error) {
		return <div>{error.toString()}</div>;
	}

	if (!data) {
		return <div>Failed to species data.</div>;
	}

	return (
		<div className='flex flex-col relative w-screen h-screen p-4'>
			<TypeBackground />
			<Searchbar />
			<div className='flex flex-row items-start'>
				<button>
					<img src={LeftArrow} className='h-6' />
				</button>
				<div className='container-col w-full items-start'>
					<div className='text-3xl uppercase text-gray-700 leading-5'>
						Pikachu
					</div>
					<div className='text-gray-500'>#025</div>
				</div>
				<button>
					<img src={RightArrow} className='h-6' />
				</button>
			</div>
			<div className='flex items-end self-center h-32'>
				<img
					src={
						data.sprites.versions['generation-v']['black-white'].animated
							.front_default
					}
					alt=''
					className='scale-250'
				/>
			</div>
		</div>
	);
};

export default Species;
