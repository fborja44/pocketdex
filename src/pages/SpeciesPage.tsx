import Searchbar from '../components/Searchbar/Searchbar';
import TypeBackground from '../components/TypeBackground/TypeBackground';
import TypeLabel from '../components/TypeLabel/TypeLabel';
import { useRef, useState } from 'react';
import { Gender, Type } from '../types';
import PageLayout from '../components/PageLayout/PageLayout';
import Token from '../components/Token/Token';
import SpeciesSprite from '../components/Species/SpeciesSprite/SpeciesSprite';
import Pokeball from '../components/Pokeball/Pokeball';
import PageHeader from '../components/PageLayout/PageHeader';
import { MAX_POKEMON_ID, MIN_POKEMON_ID } from '../constants';
import LoadingPage from './LoadingPage';
import { Route, Routes, useLoaderData } from 'react-router-dom';
import { Pokemon, PokemonSpecies } from 'pokenode-ts';
import SpeciesStats from '../components/Species/SpeciesStats/SpeciesStats';
import SpeciesBio from '../components/Species/SpeciesBio/SpeciesBio';
import SpeciesMoves from '../components/Species/SpeciesMoves/SpeciesMoves';
import GenderButton from '../components/GenderButton/GenderButton';

const SpeciesPage = () => {
	const { pokemon, species } = useLoaderData() as {
		pokemon: Pokemon;
		species: PokemonSpecies;
	};

	const content = pokemon ? (
		<SpeciesPageContent pokemon={pokemon} species={species} />
	) : (
		<LoadingPage />
	);

	console.log(pokemon);
	console.log(species);

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
	species: PokemonSpecies;
}

const SpeciesPageContent = ({ pokemon, species }: SpeciesPageContent) => {
	const single_gender = species.gender_rate === 0 || species.gender_rate === 8;

	const [gender, setGender] = useState<Gender>(
		species.gender_rate < 0
			? 'genderless'
			: species.gender_rate === 8
			? 'female'
			: 'male'
	);

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
				<SpeciesSprite
					pokemon={pokemon}
					handleClick={playCry}
					gender={gender}
				/>
			</div>
			<div className='flex flex-col px-2 box-border min-h-64 grow'>
				<section className='container-row justify-between text-sm z-10 w-11/12 mx-auto'>
					<GenderButton
						value={gender}
						setValue={setGender}
						disabled={single_gender}
					/>
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
				<section className='flex flex-row justify-between mt-3 mb-2'>
					<Token to='bio'>bio</Token>
					<Token to=''>base stats</Token>
					<Token to='evo'>evolution</Token>
					<Token to='movelist'>movelist</Token>
				</section>
				<div className='overflow-y-auto max-h-[200px]'>
					<Routes>
						<Route path='' element={<SpeciesStats pokemon={pokemon} />} />
						<Route
							path='bio'
							element={<SpeciesBio pokemon={pokemon} species={species} />}
						/>
						<Route
							path='movelist'
							element={<SpeciesMoves pokemon={pokemon} />}
						/>
					</Routes>
				</div>
			</div>
			<audio ref={audioRef} src={(pokemon as any).cries.latest}></audio>
		</>
	);
};
