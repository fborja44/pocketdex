import { Pokemon, PokemonSpecies } from 'pokenode-ts';
import SpeciesSection, {
	SpeciesSectionTitle,
} from '../SpeciesSection/SpeciesSection';
import { dmToImperial, hgToPounds } from '../../../utils/string';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducers/rootReducer';

interface SpeciesBioProps {
	pokemon: Pokemon;
	species: PokemonSpecies;
}

const SpeciesBio = ({ pokemon, species }: SpeciesBioProps) => {
	const { lang_code } = useSelector((state: AppState) => state.settingsState);

	const bio =
		species.flavor_text_entries
			.find((entry) => entry.language.name === lang_code)
			?.flavor_text.replace('', '\n') ??
		species.flavor_text_entries
			.find((entry) => entry.language.name === 'en')
			?.flavor_text.replace('', '\n');

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
			<div>{bio}</div>
		</SpeciesSection>
	);
};

export default SpeciesBio;
