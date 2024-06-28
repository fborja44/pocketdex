import { AbilityPokemon } from 'pokenode-ts';
import PokemonLabel from '../PokemonLabel/PokemonLabel';
import { getIdFromRoute } from '../../utils/path';

interface PokemonListProps {
	pokemon: AbilityPokemon[];
}

const PokemonList = ({ pokemon }: PokemonListProps) => {
	return (
		<div className='grid grid-cols-2 gap-y-3 gap-x-2 items-center mt-2'>
			{pokemon.map((entry) => (
				<PokemonLabel
					key={`label-${entry.pokemon.name}`}
					id={getIdFromRoute(entry.pokemon.url)}
				>
					{entry.pokemon.name}
				</PokemonLabel>
			))}
		</div>
	);
};

export default PokemonList;
