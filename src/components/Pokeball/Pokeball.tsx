import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { catchPokemon, releasePokemon } from '../../redux/actions/pcActions';
import PokeballSprite from '../../assets/sprites/balls/pokeball.png';
import { Pokemon } from 'pokenode-ts';
import useAudio from '../../hooks/useAudio';

interface PokeballProps {
	pokemon: Pokemon;
}

const Pokeball = ({ pokemon }: PokeballProps) => {
	const dispatch = useDispatch();

	const { playAudio: playAudioCatch } = useAudio('/assets/audio/pb_catch.wav');
	const { playAudio: playAudioRelease } = useAudio('/assets/audio/pb_rel.wav');

	const { pokemon: savedPokemon } = useSelector(
		(state: AppState) => state.pcState
	);

	const isCaught = savedPokemon.some((entry) => entry.id === pokemon.id);

	const handleClick = () => {
		if (isCaught) {
			dispatch(releasePokemon(pokemon.id));
			playAudioRelease();
		} else {
			dispatch(catchPokemon(pokemon));
			playAudioCatch();
		}
	};

	return (
		<button onClick={handleClick} className='uppercase'>
			<img
				src={PokeballSprite}
				alt={isCaught ? 'Release' : 'Catch'}
				className={`w-5 h-5 ${isCaught ? '' : 'brightness-50'}`}
			/>
		</button>
	);
};

export default Pokeball;
