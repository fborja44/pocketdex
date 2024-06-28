import { ChainLink, EvolutionChain } from 'pokenode-ts';
import SpeciesSection from '../SpeciesSection/SpeciesSection';
import DataGrid, { DataGridEntry } from '../../DataGrid/DataGrid';
import PokemonDisplay from '../../PokemonLabel/PokemonDisplay';
import { getIdFromRoute } from '../../../utils/path';
import GenderIcon from '../../GenderButton/GenderIcon';

interface SpeciesEvoProps {
	evolution: EvolutionChain;
}

const SpeciesEvo = ({ evolution }: SpeciesEvoProps) => {
	const evos: React.ReactNode[] = [];

	const getEvoData = (evoData: ChainLink | null) => {
		if (!evoData) return;

		// Check evolution trigger
		let display_text, gender;
		if (!evoData.evolution_details.length) {
			display_text = null;
		} else {
			const evo_details = evoData.evolution_details[0];
			const trigger = evo_details.trigger.name;
			switch (trigger) {
				case 'level-up':
					// Look at other details
					if (evo_details.min_level) {
						// Reach level
						display_text = 'Reach Lvl. ' + evo_details.min_level;
					} else if (evo_details.time_of_day.length) {
						// Time of Day
						switch (evo_details.time_of_day) {
							case 'Day'.toLowerCase():
								display_text = 'Lvl. Up During Day';
								break;
							case 'Night'.toLowerCase():
								display_text = 'Lvl. Up At Night';
								break;
						}
					} else if (evo_details.location) {
						// Location
						display_text =
							'Lvl. Up At ' + evo_details.location.name.replace('-', ' ');
					} else if (evo_details.min_happiness) {
						// Happiness
						display_text = 'Happiness at ' + evo_details.min_happiness;
					} else if (evo_details.min_affection) {
						// Friendship
						display_text = 'Lvl. Up With High Friendship';
						if (evo_details.known_move_type) {
							// Known Move type
							display_text +=
								' And ' + evo_details.known_move_type.name + ' Type Move';
						}
					} else if (evo_details.held_item) {
						// Held Item
						display_text =
							'Lvl. Up Holding ' + evo_details.held_item.name.replace('-', ' ');
					} else if (evo_details.known_move) {
						// Known Move
						display_text =
							'Lvl. Up With Move' +
							evo_details.known_move.name.replace('-', ' ');
					} else if (evo_details.known_move_type) {
						// Known Move type
						display_text =
							'Lvl. Up With ' + evo_details.known_move_type.name + ' Type Move';
					} else if (evo_details.min_beauty) {
						// Known Move type
						display_text = 'Lvl. Up With High Beauty';
					} else if (evo_details.party_species) {
						// Species In Party
						display_text =
							'Lvl. Up With ' +
							evo_details.party_species.name.replace('-', ' ') +
							' In Party';
					} else if (evo_details.party_type) {
						// Pokemon Type In Party
						display_text =
							'Lvl. Up With ' + evo_details.party_type.name + ' Type In Party';
					}

					if (evo_details.needs_overworld_rain) {
						// Raining
						display_text += ' While Raining';
					}

					if (evo_details.turn_upside_down) {
						// Upside Down
						display_text += ' While Holding Console Upside-Down';
					}

					break;
				case 'trade':
					display_text = 'Trade';
					if (evo_details.trade_species) {
						// Traded With Species
						display_text +=
							' With ' + evo_details.trade_species.name.replace('-', ' ');
					}
					break;
				case 'use-item':
					display_text = 'Use ' + evo_details.item?.name.replace('-', ' ');
					break;
				case 'shed':
					display_text = 'Empty Slot + Poké Ball';
					break;
				case 'spin':
					display_text = 'Spin holding a Sweet';
					break;
				case 'tower-of-darkness':
					display_text = 'Train in the Tower of Darkness';
					break;
				case 'tower-of-waters':
					display_text = 'Train in the Tower of Darkness';
					break;
				case 'three-critical-hits':
					display_text = 'Land Three Crits';
					break;
				case 'take-damage':
					display_text =
						'Pass under the rock arch in Dusty Bowl after taking at least 49 HP in damage from attacks without fainting';
					break;
				case 'agile-style-move':
					display_text =
						'Use Psyshield Bash in the agile style 20 times in Hisui';
					break;
				case 'strong-style-move':
					display_text = 'Use Barb Barrage in the strong style 20 times';
					break;
				case 'recoil-damage':
					display_text =
						'Level up after losing at least 294 HP from recoil damage';
					break;
				case 'other':
					//TODO: Individual species evolutions
					display_text = 'WIP';
					break;
			}

			// Check if specific gender
			if (evo_details.gender) {
				gender =
					evo_details.gender === 1 ? (
						<GenderIcon gender='female' />
					) : (
						<GenderIcon gender='male' />
					);
			}
		}

		evos.push(
			<DataGridEntry
				label={
					<PokemonDisplay id={getIdFromRoute(evoData.species.url)}>
						{evoData.species.name}
					</PokemonDisplay>
				}
				justify
			>
				<div className='flex flex-row gap-x-1 text-stone-600'>
					<span className='text-sm uppercase text-right'>{display_text}</span>
					{gender && <span>{gender}</span>}
				</div>
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
			<DataGrid>
				{evos.length > 1 ? evos.map((evo) => evo) : 'No Known Evolutions'}
			</DataGrid>
		</SpeciesSection>
	);
};

export default SpeciesEvo;
