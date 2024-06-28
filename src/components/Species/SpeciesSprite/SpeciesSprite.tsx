import { Pokemon } from 'pokenode-ts';
import { Gender } from '../../../types';

interface SpeciesSpriteProps {
	pokemon: Pokemon;
	handleClick?: () => void;
	animate?: boolean;
	gender: Gender;
}

const SpeciesSprite = ({
	pokemon,
	gender,
	handleClick,
}: SpeciesSpriteProps) => {
	const sprite =
		pokemon.sprites.front_female && gender === 'female'
			? 'front_female'
			: 'front_default';

	return (
		<img
			onClick={handleClick}
			src={
				pokemon.sprites.versions['generation-v']['black-white'].animated[
					sprite
				] ??
				pokemon.sprites.versions['generation-v']['black-white'][sprite] ??
				pokemon.sprites[sprite] ??
				''
			}
			alt=''
			className='absolute scale-175 bottom-12 z-0 object-none object-bottom w-full h-32'
		/>
	);
};

export default SpeciesSprite;
