import Searchbar from '../components/Searchbar/Searchbar';
import TypeBackground from '../components/TypeBackground/TypeBackground';
import LeftArrow from '../assets/sprites/ui/left-arrow.png';
import RightArrow from '../assets/sprites/ui/right-arrow.png';
import useFetch from '../hooks/useFetch';
import { formatId } from '../utils/string';
import TypeLabel from '../components/TypeLabel/TypeLabel';
import { useState } from 'react';
import ErrorPage from './ErrorPage';
import Statbar from '../components/Statbar/Statbar';

const Species = () => {
	const [id, setId] = useState(1);

	const { data, error, fetchData } = useFetch('pokemon');

	// if (loading) {
	// 	return null;
	// }

	if (error) {
		return <ErrorPage message={error.toString()} />;
	}

	if (!data) {
		return <ErrorPage message={'Failed to find species data.'} />;
	}

	return (
		<div className='flex flex-col relative w-screen h-screen p-2'>
			<TypeBackground type={data.types[0].type.name} />
			<Searchbar />
			<div className='flex flex-row items-start'>
				<button
					disabled={id === 1}
					onClick={() => {
						setId((prevId) => {
							const newId = prevId - 1;
							fetchData(newId);
							return newId;
						});
					}}
				>
					<img src={LeftArrow} className='h-5' />
				</button>
				<div className='container-col w-full items-start z-20'>
					<h1 className='text-2xl uppercase text-gray-700 leading-5'>
						{data.name ?? 'Unknown Species'}
					</h1>
					<div className='text-md text-gray-500 leading-snug'>
						{formatId(data.id)}
					</div>
				</div>
				<button
					disabled={id === 1025}
					onClick={() =>
						setId((prevId) => {
							const newId = prevId + 1;
							fetchData(newId);
							return newId;
						})
					}
				>
					<img src={RightArrow} className='h-5' />
				</button>
			</div>
			<div className='flex items-end self-center h-24'>
				<img
					src={
						data.sprites.versions['generation-v']['black-white'].animated
							.front_default
					}
					alt=''
					className='scale-175'
				/>
			</div>
			<div className='container-row justify-between w-full mt-9 text-sm z-10'>
				<button>Catch</button>
				<div className='container-row gap-x-2'>
					{data.types.map((entry: any) => (
						<TypeLabel
							type={entry.type.name}
							key={`${entry.type.name}-label`}
						/>
					))}
				</div>
				<button>Male</button>
			</div>
			<div className='flex flex-col mt-2'>
				<h2 className='text-lg'>Base Stats</h2>
				<div className='grid grid-cols-stats items-center gap-x-1'>
					{data.stats.map((statData: any) => (
						<SpeciesStat statData={statData} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Species;

interface SpeciesStatProps {
	statData: {
		base_stat: number;
		effort: number;
		stat: {
			name: string;
			url: string;
		};
	};
}

const SpeciesStat = ({ statData }: SpeciesStatProps) => {
	switch (statData.stat.name) {
		case 'hp': {
			statData.stat.name = 'health';
			break;
		}
		case 'special-attack': {
			statData.stat.name = 'sp. attack';
			break;
		}
		case 'special-defense': {
			statData.stat.name = 'sp. def';
			break;
		}
	}
	// Calculate width of stat bar display
	const width =
		Math.min(Math.floor(10 + (statData.base_stat / 255) * 120 * 1.1), 120) +
		'px';

	let color = '';
	if (statData.base_stat > 200) {
		color = 'bg-cyan-500';
	} else if (statData.base_stat > 120) {
		color = 'bg-green-500';
	} else if (statData.base_stat > 100) {
		color = 'bg-lime-500';
	} else if (statData.base_stat > 80) {
		color = 'bg-orange-500';
	} else if (statData.base_stat > 50) {
		color = 'bg-yellow-500';
	} else {
		color = 'bg-red-500';
	}

	return (
		<>
			<div className='text-sm capitalize'>{statData.stat.name}</div>
			<div className='text-md justify-self-center'>{statData.base_stat}</div>
			<div className='relative'>
				<Statbar />
				<span
					style={{ width: width }}
					className={`${color} h-[3px] absolute bottom-[3px] left-[3px]`}
				></span>{' '}
				{/* 120px = 100% = 255 points */}
			</div>
		</>
	);
};
