import Searchbar from '../components/Searchbar/Searchbar';
import TypeBackground from '../components/TypeBackground/TypeBackground';
import LeftArrow from '../assets/sprites/ui/left-arrow.png';
import RightArrow from '../assets/sprites/ui/right-arrow.png';
import { formatId } from '../utils/string';
import TypeLabel from '../components/TypeLabel/TypeLabel';
import { useState } from 'react';
import Statbar from '../components/Statbar/Statbar';
import { Type } from '../types';
import usePokemon from '../hooks/usePokemon';
import { MAX_POKEMON_ID, MIN_POKEMON_ID } from '../constants';
import PageLayout from '../components/PageLayout/PageLayout';
import ErrorPage, { ErrorBody } from './ErrorPage';
import Token from '../components/Token/Token';

const SpeciesPage = () => {
	const [id, setId] = useState<number>(1);

	const { data, error, loading, fetchPokemon } = usePokemon();

	const handleBrowse = (newId: number) => {
		setId(newId);
		fetchPokemon(newId.toString());
	};

	const handleSearch = async (searchTerm: string | number) => {
		const data = await fetchPokemon(searchTerm.toString().toLowerCase());
		setId((prevId) => data?.id ?? prevId);
	};

	if (error && loading) {
		return null;
	}

	if (!data) {
		return <ErrorPage message='Fetching data...' />;
	}

	return (
		<PageLayout>
			<Searchbar handleSearch={handleSearch} placeholder='Enter a pokemon' />
			{!error ? (
				<>
					<TypeBackground type={data.types[0].type.name as Type} />
					<section className='flex flex-row items-start'>
						<button
							className='disabled:opacity-50 hover:brightness-90 transition-all'
							disabled={id === MIN_POKEMON_ID}
							onClick={() => handleBrowse(data.id - 1)}
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
							className='disabled:opacity-50 hover:brightness-90 transition-all'
							disabled={id === MAX_POKEMON_ID}
							onClick={() => handleBrowse(data.id + 1)}
						>
							<img src={RightArrow} className='h-5' />
						</button>
					</section>
					<div className='flex items-end self-center h-24'>
						<img
							src={
								data.sprites.versions['generation-v']['black-white'].animated
									.front_default ?? ''
							}
							alt=''
							className='scale-175'
						/>
					</div>
					<section className='container-row justify-between w-full mt-9 text-sm z-10'>
						<button>Catch</button>
						<div className='container-row gap-x-2'>
							{data.types.map((entry) => (
								<TypeLabel
									type={entry.type.name as Type}
									key={`${entry.type.name}-label`}
								/>
							))}
						</div>
						<button>Male</button>
					</section>
					<section className='flex flex-row gap-x-2 mt-4 mb-3'>
						<Token>bio</Token>
						<Token>base stats</Token>
						<Token>evolution</Token>
						<Token>movelist</Token>
					</section>
					<section className='flex flex-col'>
						<h2 className='text-lg'>Base Stats</h2>
						<div className='grid grid-cols-stats items-center gap-x-1'>
							{data.stats.map((statData) => (
								<SpeciesStat statData={statData} key={statData.stat.name} />
							))}
						</div>
					</section>
				</>
			) : (
				<ErrorBody message={'Failed to find species data.'} />
			)}
		</PageLayout>
	);
};

export default SpeciesPage;

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
		Math.min(Math.floor((statData.base_stat / 255) * 120 * 1.3), 120) + 'px';

	let color = '';
	if (statData.base_stat > 185) {
		color = 'bg-cyan-500';
	} else if (statData.base_stat > 119) {
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
