import Searchbar from '../components/Searchbar/Searchbar';
import TypeBackground from '../components/TypeBackground/TypeBackground';
import LeftArrow from '../assets/sprites/ui/left-arrow.png';
import RightArrow from '../assets/sprites/ui/right-arrow.png';
import useFetch from '../hooks/useFetch';
import { formatId } from '../utils/string';
import TypeLabel from '../components/TypeLabel/TypeLabel';

const Species = () => {
	const { data, loading, error } = useFetch('pokemon', 'pikachu');

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
			<TypeBackground type={data.types[0].type.name} />
			<Searchbar />
			<div className='flex flex-row items-start'>
				<button>
					<img src={LeftArrow} className='h-7' />
				</button>
				<div className='container-col w-full items-start'>
					<div className='text-4xl uppercase text-gray-700 leading-5'>
						{data.name ?? 'Unknown Species'}
					</div>
					<div className='text-xl leading-relaxed text-gray-500'>
						{formatId(data.id)}
					</div>
				</div>
				<button>
					<img src={RightArrow} className='h-7' />
				</button>
			</div>
			<div className='flex items-end self-center h-32'>
				<img
					src={
						data.sprites.versions['generation-v']['black-white'].animated
							.front_default
					}
					alt=''
					className='scale-250 ml-6'
				/>
			</div>
			<div className='container-row justify-between w-full mt-20'>
				<button>Catch</button>
				<div className='container-row gap-x-2'>
					{data.types.map((entry: any) => (
						<TypeLabel type={entry.type.name} />
					))}
				</div>
				<button>Male</button>
			</div>
		</div>
	);
};

export default Species;
