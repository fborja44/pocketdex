import { Pokemon, PokemonSpecies } from 'pokenode-ts';
import SpeciesSection, {
	SpeciesSectionTitle,
} from '../SpeciesSection/SpeciesSection';
import { dmToImperial, hgToPounds } from '../../../utils/string';

interface SpeciesBioProps {
	pokemon: Pokemon;
	species: PokemonSpecies;
}

const SpeciesBio = ({ pokemon, species }: SpeciesBioProps) => {
	return (
		<SpeciesSection>
			<div className='flex flex-row justify-between w-full my-1 px-1'>
				<div className='flex flex-col items-center'>
					<span className='text-stone-700'>Height</span>
					<div>{dmToImperial(pokemon.height)}</div>
				</div>
				<div className='flex flex-col items-center'>
					<span className='text-stone-700'>Weight</span>
					<div>{hgToPounds(pokemon.weight)}</div>
				</div>
				<div className='flex flex-col items-center'>
					<span className='text-stone-700'>Egg Group</span>
					<div className='capitalize'>
						{species.egg_groups.map((entry) => entry.name).join(', ')}
					</div>
				</div>
			</div>
			<SpeciesSectionTitle>Bio</SpeciesSectionTitle>
			<div>
				{species.flavor_text_entries
					.find((entry) => entry.language.name === 'en')
					?.flavor_text.replace('', '\n')}
			</div>
		</SpeciesSection>
	);
};

export default SpeciesBio;
