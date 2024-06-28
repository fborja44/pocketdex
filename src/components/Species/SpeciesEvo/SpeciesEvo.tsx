import { ChainLink, EvolutionChain } from 'pokenode-ts';
import SpeciesSection from '../SpeciesSection/SpeciesSection';
import DataGrid, { DataGridEntry } from '../../DataGrid/DataGrid';
import PokemonLabel from '../../PokemonLabel/PokemonLabel';
import { getIdFromRoute } from '../../../utils/path';

interface SpeciesEvoProps {
	evolution: EvolutionChain;
}

const SpeciesEvo = ({ evolution }: SpeciesEvoProps) => {
	const evos: React.ReactNode[] = [];

	const getEvoData = (evoData: ChainLink | null) => {
		if (!evoData) return;
		evos.push(
			<DataGridEntry
				label={
					<PokemonLabel id={getIdFromRoute(evoData.species.url)}>
						{evoData.species.name}
					</PokemonLabel>
				}
				justify
			>
				<span className='text-sm'>
					{evoData.evolution_details.length
						? 'Evolves At Lvl. ' + evoData.evolution_details[0].min_level
						: ''}
				</span>
			</DataGridEntry>
		);
		// Recursively call down path for each evolution path
		for (const evolvesTo of evoData.evolves_to) {
			getEvoData(evolvesTo);
		}
	};

	getEvoData(evolution.chain);

	return (
		<SpeciesSection title='Evolution'>
			<DataGrid>{evos.map((evo) => evo)}</DataGrid>
		</SpeciesSection>
	);
};

export default SpeciesEvo;
