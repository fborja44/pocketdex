import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { catchPokemon, releasePokemon } from '../../redux/actions/pcActions';
import PokeballSprite from '../../assets/sprites/balls/pokeball.png';
import { Pokemon } from 'pokenode-ts';

interface PokeballProps {
	pokemon: Pokemon;
}

const Pokeball = ({ pokemon }: PokeballProps) => {
	const dispatch = useDispatch();

	const { pokemon: savedPokemon } = useSelector(
		(state: AppState) => state.pcState
	);

	const isCaught = savedPokemon.some((entry) => entry.id === pokemon.id);

	const handleClick = () => {
		if (isCaught) {
			dispatch(releasePokemon(pokemon.id));
		} else {
			dispatch(catchPokemon(pokemon));
		}
	};

	return (
		<button onClick={handleClick} className='uppercase'>
			<img
				src={PokeballSprite}
				alt={isCaught ? 'Release' : 'Catch'}
				className={`w-5 h-5 ${
					isCaught
						? 'hover:brightness-50'
						: 'brightness-50 hover:brightness-100'
				}`}
			/>
		</button>
	);
};

export default Pokeball;
