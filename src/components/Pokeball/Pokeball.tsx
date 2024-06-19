import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../redux/reducers/rootReducer';
import { catchPokemon, releasePokemon } from '../../redux/actions/pcActions';
import PokeballSprite from '../../assets/sprites/balls/pokeball.png';

interface PokeballProps {
	id: number;
}

const Pokeball = ({ id }: PokeballProps) => {
	const dispatch = useDispatch();

	const { pokemon } = useSelector((state: AppState) => state.pcState);

	const isCaught = pokemon.includes(id);

	const handleClick = () => {
		if (isCaught) {
			dispatch(releasePokemon(id));
		} else {
			dispatch(catchPokemon(id));
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
