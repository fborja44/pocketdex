import Searchbar from '../components/Searchbar/Searchbar';
import TypeBackground from '../components/TypeBackground/TypeBackground';
import TypeLabel from '../components/TypeLabel/TypeLabel';
import { useRef } from 'react';
import Statbar from '../components/Statbar/Statbar';
import { Type } from '../types';
import PageLayout from '../components/PageLayout/PageLayout';
import Token from '../components/Token/Token';
import SpeciesSprite from '../components/SpeciesSprite/SpeciesSprite';
import Pokeball from '../components/Pokeball/Pokeball';
import PageHeader from '../components/PageLayout/PageHeader';
import { MAX_POKEMON_ID, MIN_POKEMON_ID } from '../constants';
import LoadingPage from './LoadingPage';
import { useLoaderData } from 'react-router-dom';
import { Pokemon } from 'pokenode-ts';

const SpeciesPage = () => {
	const pokemon = useLoaderData() as Pokemon;

	const content = pokemon ? (
		<SpeciesPageContent pokemon={pokemon} />
	) : (
		<LoadingPage />
	);

	console.log(pokemon);

	return (
		<PageLayout>
			<TypeBackground type={pokemon?.types[0].type.name as Type} />
			<div className='px-2 pt-2'>
				<Searchbar placeholder='Enter a pokemon...' />
				<PageHeader
					minId={MIN_POKEMON_ID}
					maxId={MAX_POKEMON_ID}
					data={pokemon}
				/>
			</div>
			{content}
		</PageLayout>
	);
};

export default SpeciesPage;

interface SpeciesPageContent {
	pokemon: Pokemon;
}

const SpeciesPageContent = ({ pokemon }: SpeciesPageContent) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const playCry = () => {
		if (audioRef?.current) {
			audioRef.current.volume = 0.05;
			audioRef.current.play();
		}
	};

	return (
		<>
			<div className='flex items-end self-center h-52 w-full relative mb-2'>
				<SpeciesSprite pokemon={pokemon} handleClick={playCry} />
			</div>
			<div className='flex flex-col px-2 box-border grow'>
				<section className='container-row justify-between text-sm z-10 w-11/12 mx-auto'>
					<button>Male</button>
					<div className='container-row gap-x-2'>
						{pokemon.types.map((entry) => (
							<TypeLabel
								type={entry.type.name as Type}
								key={`${entry.type.name}-label`}
							/>
						))}
					</div>
					<Pokeball pokemon={pokemon} />
				</section>
				<section className='flex flex-row justify-between my-2.5'>
					<Token>bio</Token>
					<Token>base stats</Token>
					<Token>evolution</Token>
					<Token>movelist</Token>
				</section>
				<section className='flex flex-col grow'>
					<h2 className='text-lg'>Base Stats</h2>
					<div className='grid grid-cols-stats items-center gap-x-1 grow mb-2'>
						{pokemon.stats.map((statData) => (
							<SpeciesStat statData={statData} key={statData.stat.name} />
						))}
					</div>
				</section>
			</div>
			<audio ref={audioRef} src={(pokemon as any).cries.latest}></audio>
		</>
	);
};

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
			<div className='text-sm capitalize text-stone-500'>
				{statData.stat.name}
			</div>
			<div className='text-lg justify-self-center'>{statData.base_stat}</div>
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
