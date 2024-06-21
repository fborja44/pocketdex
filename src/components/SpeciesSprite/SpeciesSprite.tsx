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
					.front_default ??
				pokemon.sprites.versions['generation-v']['black-white'].front_default ??
				pokemon.sprites.front_default ??
				''
			}
			alt=''
			className='absolute scale-175 bottom-12 hover:cursor-pointer z-0 object-none object-bottom w-full h-32'
		/>
	);
};

export default SpeciesSprite;
