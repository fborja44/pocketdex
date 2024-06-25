import { Pokemon } from 'pokenode-ts';
import SpeciesStatbar from './SpeciesStatbar';
import SpeciesSection from '../SpeciesSection/SpeciesSection';

interface SpeciesStatsProps {
	pokemon: Pokemon;
}

const SpeciesStats = ({ pokemon }: SpeciesStatsProps) => {
	return (
		<SpeciesSection title='Base Stats'>
			<div className='grid grid-cols-stats items-center gap-x-1 grow box-border'>
				{pokemon.stats.map((statData) => (
					<SpeciesStatbar statData={statData} key={statData.stat.name} />
				))}
			</div>
		</SpeciesSection>
	);
};

export default SpeciesStats;
