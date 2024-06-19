import Searchbar from '../components/Searchbar/Searchbar';
import TypeBackground from '../components/TypeBackground/TypeBackground';
import TypeLabel from '../components/TypeLabel/TypeLabel';
import { useRef, useState } from 'react';
import Statbar from '../components/Statbar/Statbar';
import { Type } from '../types';
import usePokemon from '../hooks/usePokemon';
import PageLayout from '../components/PageLayout/PageLayout';
import ErrorPage, { ErrorBody } from './ErrorPage';
import Token from '../components/Token/Token';
import SpeciesSprite from '../components/SpeciesSprite/SpeciesSprite';
import Pokeball from '../components/Pokeball/Pokeball';
import PageHeader from '../components/PageLayout/PageHeader';
import { MAX_POKEMON_ID, MIN_POKEMON_ID } from '../constants';

const SpeciesPage = () => {
	const [id, setId] = useState<number>(1);

	const { pokemon, error, loading, fetchPokemon } = usePokemon();

	const audioRef = useRef<HTMLAudioElement | null>(null);

	const handleBrowse = (newId: number) => {
		setId(newId);
		fetchPokemon(newId.toString());
	};

	const handleSearch = async (searchTerm: string | number) => {
		const searchPokemon = await fetchPokemon(
			searchTerm.toString().toLowerCase()
		);
		setId((prevId) => searchPokemon?.id ?? prevId);
	};

	if (error && loading) {
		return null;
	}

	if (!pokemon) {
		return <ErrorPage message='Fetching data...' />;
	}

	console.log(pokemon);

	const playCry = () => {
		if (audioRef?.current) {
			audioRef.current.volume = 0.05;
			audioRef.current.play();
		}
	};

	return (
		<PageLayout>
			<Searchbar handleSearch={handleSearch} placeholder='Enter a pokemon...' />
			{!error ? (
				<>
					<TypeBackground type={pokemon.types[0].type.name as Type} />
					<PageHeader
						id={id}
						minId={MIN_POKEMON_ID}
						maxId={MAX_POKEMON_ID}
						handlePrev={() => handleBrowse(id - 1)}
						handleNext={() => handleBrowse(id + 1)}
						data={pokemon}
					/>
					<div className='flex items-end self-center h-24'>
						<SpeciesSprite pokemon={pokemon} handleClick={playCry} />
					</div>
					<section className='container-row justify-between w-full mt-9 text-sm z-10'>
						<Pokeball id={id} />
						<div className='container-row gap-x-2'>
							{pokemon.types.map((entry) => (
								<TypeLabel
									type={entry.type.name as Type}
									key={`${entry.type.name}-label`}
								/>
							))}
						</div>
						<button>Male</button>
					</section>
					<section className='flex flex-row justify-between mt-4 mb-3'>
						<Token>bio</Token>
						<Token>base stats</Token>
						<Token>evolution</Token>
						<Token>movelist</Token>
					</section>
					<section className='flex flex-col'>
						<h2 className='text-lg'>Base Stats</h2>
						<div className='grid grid-cols-stats items-center gap-x-1'>
							{pokemon.stats.map((statData) => (
								<SpeciesStat statData={statData} key={statData.stat.name} />
							))}
						</div>
					</section>
					<audio ref={audioRef} src={(pokemon as any).cries.latest}></audio>
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
		Math.min(Math.floor((statData.base_stat / 255) * 150 * 1.2), 150) + 'px';

	let color = '';
	if (statData.base_stat >= 185) {
		color = 'bg-cyan-500';
	} else if (statData.base_stat >= 120) {
		color = 'bg-green-500';
	} else if (statData.base_stat >= 100) {
		color = 'bg-lime-500';
	} else if (statData.base_stat >= 80) {
		color = 'bg-yellow-500';
	} else if (statData.base_stat >= 50) {
		color = 'bg-orange-500';
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
					className={`${color} h-[3px] absolute bottom-[4px] left-[3px]`}
				></span>{' '}
				{/* 150px = 100% = 255 points */}
			</div>
		</>
	);
};
