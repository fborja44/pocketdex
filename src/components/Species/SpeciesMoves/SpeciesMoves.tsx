import { Pokemon, PokemonMove } from 'pokenode-ts';
import { Link } from 'react-router-dom';
import SpeciesSection from '../SpeciesSection/SpeciesSection';

interface SpeciesMovesProps {
	pokemon: Pokemon;
}

const SpeciesMoves = ({ pokemon }: SpeciesMovesProps) => {
	return (
		<SpeciesSection title='Movelist'>
			<div className='grid grid-cols-2'>
				{pokemon.moves.map((move) => (
					<MoveDisplay move={move} />
				))}
			</div>
		</SpeciesSection>
	);
};

export default SpeciesMoves;

interface MoveDisplayProps {
	move: PokemonMove;
}

const MoveDisplay = ({ move }: MoveDisplayProps) => {
	return (
		<Link
			to={`/move/${move.move.name}`}
			className='capitalize hover:text-stone-700'
		>
			{move.move.name.replace('-', ' ')}
		</Link>
	);
};
