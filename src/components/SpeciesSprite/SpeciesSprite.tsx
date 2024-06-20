import { Pokemon } from 'pokenode-ts';

interface SpeciesSpriteProps {
	pokemon: Pokemon;
	handleClick?: () => void;
	animate?: boolean;
}

const SpeciesSprite = ({ pokemon, handleClick }: SpeciesSpriteProps) => {
	return (
		<img
			onClick={handleClick}
			src={
				pokemon.sprites.versions['generation-v']['black-white'].animated
					.front_default ?? ''
			}
			alt=''
			className='scale-175 hover:cursor-pointer'
		/>
	);
};

export default SpeciesSprite;
